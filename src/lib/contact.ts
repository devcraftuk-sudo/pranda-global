export const LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
} as const;

export const MESSAGE_MIN = 10;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  faxNumber: string;
};

export type FieldName = "name" | "email" | "subject" | "message";

export type ValidationResult =
  | { ok: true; honeypot: true }
  | { ok: true; honeypot: false; value: Omit<ContactInput, "faxNumber"> }
  | { ok: false; fields: FieldName[] };

function readString(source: Record<string, unknown>, key: string): string {
  const value = source[key];
  return typeof value === "string" ? value.trim() : "";
}

export function validateContact(input: unknown): ValidationResult {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { ok: false, fields: ["name", "email", "subject", "message"] };
  }

  const source = input as Record<string, unknown>;
  const faxNumber = readString(source, "fax_number");
  if (faxNumber) return { ok: true, honeypot: true };

  const name = readString(source, "name");
  const email = readString(source, "email");
  const subject = readString(source, "subject");
  const message = readString(source, "message");

  const fields: FieldName[] = [];
  if (!name || name.length > LIMITS.name || /[\r\n]/.test(name)) fields.push("name");
  if (
    !email ||
    email.length > LIMITS.email ||
    !EMAIL_PATTERN.test(email)
  ) {
    fields.push("email");
  }
  if (!subject || subject.length > LIMITS.subject || /[\r\n]/.test(subject)) {
    fields.push("subject");
  }
  if (message.length < MESSAGE_MIN || message.length > LIMITS.message) {
    fields.push("message");
  }

  if (fields.length > 0) return { ok: false, fields };
  return { ok: true, honeypot: false, value: { name, email, subject, message } };
}
