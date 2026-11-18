import { Resend } from "resend";

/**
 * Contact mail is sent only through Resend.
 * The recipient is CONTACT_TO_EMAIL. The visitor never chooses it.
 * CONTACT_FROM_EMAIL must be a sender Resend has verified.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBJECT = "New website enquiry — Pranda Global";

type ResendConfig = {
  ok: true;
  to: string;
  from: string;
  apiKey: string;
};

export type MailConfig = ResendConfig | { ok: false; missing: string[] };

export type OutboundMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function readEnv(name: "RESEND_API_KEY" | "CONTACT_FROM_EMAIL" | "CONTACT_TO_EMAIL"): string {
  const value =
    name === "RESEND_API_KEY"
      ? process.env.RESEND_API_KEY
      : name === "CONTACT_FROM_EMAIL"
        ? process.env.CONTACT_FROM_EMAIL
        : process.env.CONTACT_TO_EMAIL;
  return value?.trim() ?? "";
}

function formatFrom(from: string): string {
  return from.includes("<") ? from : `Pranda Global <${from}>`;
}

function bareAddress(from: string): string {
  const match = from.match(/<([^>]+)>/);
  return (match ? match[1] : from).trim();
}

export function getMailConfig(): MailConfig {
  const to = readEnv("CONTACT_TO_EMAIL");
  const from = readEnv("CONTACT_FROM_EMAIL");
  const apiKey = readEnv("RESEND_API_KEY");
  const missing: string[] = [];

  if (!apiKey) missing.push("RESEND_API_KEY");
  if (!to || !EMAIL_PATTERN.test(to)) missing.push("CONTACT_TO_EMAIL");
  if (!from || !EMAIL_PATTERN.test(bareAddress(from))) missing.push("CONTACT_FROM_EMAIL");
  if (missing.length > 0) return { ok: false, missing };

  return { ok: true, to, from: formatFrom(from), apiKey };
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

export async function sendContactEmail(
  message: OutboundMessage,
): Promise<"sent" | "unconfigured" | "failed"> {
  const config = getMailConfig();
  if (!config.ok) {
    console.error(`Contact email is not configured: ${config.missing.join(", ")}`);
    return "unconfigured";
  }

  try {
    const resend = new Resend(config.apiKey);
    const { error } = await resend.emails.send({
      from: config.from,
      to: [config.to],
      replyTo: message.email,
      subject: SUBJECT,
      text: messageText(message),
    });
    if (error) {
      console.error(`Contact email was rejected by Resend: ${error.name} ${error.statusCode ?? ""}`.trim());
      return "failed";
    }
    return "sent";
  } catch {
    console.error("Contact email failed");
    return "failed";
  }
}
