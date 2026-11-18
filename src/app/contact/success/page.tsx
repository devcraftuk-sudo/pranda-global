import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { safeHttpUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "Message sent — Pranda Global",
  description: "Your message to Pranda Global has been sent.",
};

export default function ContactSuccess() {
  return (
    <div id="top">
      <Header />
      <main id="content" className="bg-sand px-6 py-24 lg:py-32">
        <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col justify-center">
          <p className="text-xs tracking-[0.18em] text-slate uppercase">Contact</p>
          <h1 className="mt-4 font-serif text-3xl leading-tight text-navy sm:text-4xl">
            Your message has been sent
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate">
            Thank you for contacting Pranda Global. We&apos;ll get back to you as soon as possible.
          </p>
          <Link
            href="/"
            className="group mt-10 inline-flex w-fit items-center gap-2 bg-navy px-6 py-3 text-sm tracking-wide text-ivory transition-colors duration-300 hover:bg-brass hover:text-navy"
          >
            Return to homepage
            <Arrow />
          </Link>
        </div>
      </main>
      <Footer privacyUrl={safeHttpUrl(process.env.PRIVACY_POLICY_URL)} />
    </div>
  );
}
