import nodemailer from "nodemailer";

/**
 * Email delivery is selected entirely by environment variables.
 * EMAIL_PROVIDER=resend uses the Resend HTTP API.
 * EMAIL_PROVIDER=smtp uses the SMTP settings below.
 * The From address must be a sender the chosen provider has verified.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ResendConfig = {
  ok: true;
  provider: "resend";
  to: string;
  from: string;
  apiKey: string;
};

type SmtpConfig = {
  ok: true;
  provider: "smtp";
  to: string;
  from: string;
  host: string;
  port: number;
  user: string;
  password: string;
};

export type MailConfig = ResendConfig | SmtpConfig | { ok: false };

export type OutboundMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function required(name: string): string {
  return process.env[name]?.trim() ?? "";
}

function formatFrom(from: string): string {
  return from.includes("<") ? from : `Pranda Global <${from}>`;
}

function bareAddress(from: string): string {
  const match = from.match(/<([^>]+)>/);
  return (match ? match[1] : from).trim();
}

export function getMailConfig(): MailConfig {
  const to = required("CONTACT_TO_EMAIL");
  const from = required("CONTACT_FROM_EMAIL");
  const provider = required("EMAIL_PROVIDER").toLowerCase();

  if (!EMAIL_PATTERN.test(to) || !EMAIL_PATTERN.test(bareAddress(from))) {
    return { ok: false };
  }

  const formattedFrom = formatFrom(from);

  if (provider === "resend") {
    const apiKey = required("RESEND_API_KEY");
    if (!apiKey) return { ok: false };
    return { ok: true, provider, to, from: formattedFrom, apiKey };
  }

  if (provider === "smtp") {
    const host = required("SMTP_HOST");
    const user = required("SMTP_USER");
    const password = required("SMTP_PASSWORD");
    const port = Number(required("SMTP_PORT"));
    if (!host || !user || !password || !Number.isInteger(port) || port < 1 || port > 65535) {
      return { ok: false };
    }
    return { ok: true, provider, to, from: formattedFrom, host, port, user, password };
  }

  return { ok: false };
}

function messageText(message: OutboundMessage): string {
  return [
    "New enquiry from the Pranda Global website",
    "",
    `Name: ${message.name}`,
    `Email: ${message.email}`,
    `Subject: ${message.subject}`,
    "",
    message.message,
  ].join("\n");
}

async function sendWithResend(config: ResendConfig, message: OutboundMessage): Promise<boolean> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: message.email,
      subject: `[Pranda Global] ${message.subject}`,
      text: messageText(message),
    }),
  });

  if (!response.ok) {
    console.error("Contact email was rejected by Resend", response.status);
    return false;
  }
  return true;
}

async function sendWithSmtp(config: SmtpConfig, message: OutboundMessage): Promise<boolean> {
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.password },
  });

  await transport.sendMail({
    from: config.from,
    to: config.to,
    replyTo: message.email,
    subject: `[Pranda Global] ${message.subject}`,
    text: messageText(message),
  });
  return true;
}

export async function sendContactEmail(message: OutboundMessage): Promise<"sent" | "unconfigured" | "failed"> {
  const config = getMailConfig();
  if (!config.ok) return "unconfigured";

  try {
    const accepted =
      config.provider === "resend"
        ? await sendWithResend(config, message)
        : await sendWithSmtp(config, message);
    return accepted ? "sent" : "failed";
  } catch (error) {
    console.error(
      "Contact email failed",
      error instanceof Error ? error.message : "unknown error",
    );
    return "failed";
  }
}
