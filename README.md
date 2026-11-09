# Pranda Global

Institutional website for Pranda Global, built with Next.js App Router and TypeScript. The site is a single English page covering cross-border financial fraud, asset recovery, investor protection, and legal strategy.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form

`POST /api/contact` validates the submission and sends it through the provider selected by `EMAIL_PROVIDER`. The visitor’s email is the Reply-To address, and `CONTACT_FROM_EMAIL` is the From address. Success is shown only after the provider accepts the message. Credentials and provider errors stay on the server.

Copy `.env.example` to `.env.local` for local delivery. On Vercel, set the same variables in Project Settings → Environment Variables, then redeploy. `BOOKING_URL` and `PRIVACY_POLICY_URL` are read when the page is built, so a redeploy is required after changing them.

### Resend

Set `EMAIL_PROVIDER=resend` and `RESEND_API_KEY`.

Before mail will send, verify the domain of `CONTACT_FROM_EMAIL` in the [Resend dashboard](https://resend.com/domains) and add the DNS records Resend provides (SPF and DKIM). An unverified domain is rejected, and the form shows a generic failure.

### SMTP

Set `EMAIL_PROVIDER=smtp` plus `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASSWORD`. Port 465 uses implicit TLS; any other port uses STARTTLS.

The account in `SMTP_USER` must be allowed to send as `CONTACT_FROM_EMAIL`. Most providers require that sender to be verified in their dashboard before they will accept mail.

## Editable content

Client-approved wording, the portrait path, and the public footer links live in `src/lib/site.ts`. `publicEmail` is the address opened by the footer email icon. `CONTACT_TO_EMAIL` is only the contact-form recipient.

## Deploy

Import the repository in Vercel. The framework preset is Next.js and no extra build configuration is required. Set the environment variables above, then deploy.

## Before publication

- Add confirmed Instagram and WhatsApp URLs in `contactChannels`, and set `publicEmail` for the footer email icon.
- Set `BOOKING_URL` and `PRIVACY_POLICY_URL` once the client supplies them.
- Set the email variables and complete sender verification, then send a test message.
- The hero and quote photographs are licensed stand-ins. Replace them if the client supplies their own photography.

## Photographs

- World Trade Center, Montevideo — [JacobinoWunsh](https://commons.wikimedia.org/wiki/File:World_Trade_Center_of_Montevideo.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- Puente de la Mujer, Buenos Aires — [Jorge Lascar](https://commons.wikimedia.org/wiki/File:Puente_de_la_mujer_Buenos_Aires_Argentina.JPG), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
