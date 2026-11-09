"use client";

import { useState, type FormEvent } from "react";
import { Arrow } from "@/components/Arrow";
import { LIMITS, MESSAGE_MIN, validateContact, type FieldName } from "@/lib/contact";

const FIELD_MESSAGES: Record<FieldName, string> = {
  name: `Please enter your name, using at most ${LIMITS.name} characters.`,
  email: "Please enter a valid email address.",
  subject: `Please enter a subject, using at most ${LIMITS.subject} characters.`,
  message: `Please enter a message of at least ${MESSAGE_MIN} characters.`,
};

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "mt-2 w-full border border-ivory/25 bg-transparent px-3 py-3 text-base text-ivory outline-none transition-colors duration-300 placeholder:text-ivory/40 focus:border-brass";

export function ContactForm({ bookingUrl }: { bookingUrl: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [formError, setFormError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    const checked = validateContact(payload);
    setFieldErrors({});
    setFormError("");

    if (!checked.ok) {
      const next: Partial<Record<FieldName, string>> = {};
      for (const field of checked.fields) next[field] = FIELD_MESSAGES[field];
      setFieldErrors(next);
      return;
    }
    if (checked.honeypot) {
      form.reset();
      setStatus("success");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => null)) as {
        error?: string;
        fields?: FieldName[];
      } | null;

      if (response.ok) {
        form.reset();
        setStatus("success");
        return;
      }
      if (body?.error === "unavailable") {
        setStatus("error");
        setFormError("Email delivery is not connected yet, so this message was not sent.");
        return;
      }
      if (body?.error === "invalid" && Array.isArray(body.fields)) {
        const next: Partial<Record<FieldName, string>> = {};
        for (const field of body.fields) {
          if (field in FIELD_MESSAGES) next[field] = FIELD_MESSAGES[field];
        }
        setFieldErrors(next);
        setStatus("idle");
        return;
      }
      setStatus("error");
      setFormError(
        body?.error === "rate_limited"
          ? "Too many messages were sent from this connection. Please wait and try again."
          : "Your message could not be sent. Please try again.",
      );
    } catch {
      setStatus("error");
      setFormError("Your message could not be sent. Please try again.");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-navy px-6 py-24 text-ivory lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="reveal">
          <p className="text-xs tracking-[0.18em] text-ivory/60 uppercase">Contact</p>
          <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
            Speak with Pranda Global
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ivory/75">
            Send a short note about the matter. A member of the practice will reply by email.
          </p>
          {bookingUrl ? (
            <a
              href={bookingUrl}
              className="group mt-8 inline-flex items-center gap-2 border border-ivory/40 px-6 py-3 text-sm tracking-wide transition-colors duration-300 hover:border-brass hover:text-brass"
            >
              Book a call
              <Arrow />
            </a>
          ) : null}
        </div>

        <div className="reveal" data-reveal-delay="110">
        {status === "success" ? (
          <div role="status" className="max-w-md">
            <p className="font-serif text-2xl">Thank you. Your message has been sent.</p>
            <p className="mt-4 leading-relaxed text-ivory/75">We will reply to the email you provided.</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 text-sm tracking-wide text-brass underline-offset-4 hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="max-w-xl">
            <div className="hp" aria-hidden="true">
              <label htmlFor="fax_number">Fax number</label>
              <input id="fax_number" name="fax_number" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div role="status" aria-live="polite" className="min-h-6 text-sm text-ivory/80">
              {status === "sending" ? "Sending your message…" : ""}
            </div>
            {status === "error" ? (
              <p role="alert" className="mb-4 text-sm text-[#F3D2C9]">
                {formError}
              </p>
            ) : null}

            <Field
              id="name"
              label="Name"
              autoComplete="name"
              maxLength={LIMITS.name}
              error={fieldErrors.name}
              disabled={status === "sending"}
            />
            <Field
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              maxLength={LIMITS.email}
              error={fieldErrors.email}
              disabled={status === "sending"}
            />
            <Field
              id="subject"
              label="Subject"
              maxLength={LIMITS.subject}
              error={fieldErrors.subject}
              disabled={status === "sending"}
            />
            <div className="mt-6">
              <label htmlFor="message" className="text-xs tracking-[0.16em] text-ivory/70 uppercase">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                maxLength={LIMITS.message}
                disabled={status === "sending"}
                aria-invalid={fieldErrors.message ? true : undefined}
                aria-describedby={fieldErrors.message ? "message-error" : undefined}
                className={`${inputClass} resize-y`}
              />
              {fieldErrors.message ? (
                <p id="message-error" className="mt-2 text-sm text-[#F3D2C9]">
                  {fieldErrors.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group mt-8 inline-flex items-center gap-2 bg-ivory px-6 py-3 text-sm tracking-wide text-navy transition-colors duration-300 hover:bg-brass disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message"}
              <Arrow />
            </button>
          </form>
        )}
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
  maxLength,
  error,
  disabled,
}: {
  id: FieldName;
  label: string;
  type?: string;
  autoComplete?: string;
  maxLength: number;
  error?: string;
  disabled: boolean;
}) {
  return (
    <div className="mt-6">
      <label htmlFor={id} className="text-xs tracking-[0.16em] text-ivory/70 uppercase">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={autoComplete}
        maxLength={maxLength}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#F3D2C9]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
