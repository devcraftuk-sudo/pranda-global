import Image from "next/image";
import { Arrow } from "@/components/Arrow";

export function Hero() {
  return (
    <section className="lg:grid lg:min-h-[calc(100svh-5rem)] lg:grid-cols-2">
      <div className="reveal relative order-1 flex flex-col justify-center px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <svg
          aria-hidden="true"
          viewBox="0 0 160 160"
          className="pointer-events-none absolute top-8 right-6 hidden h-28 w-28 text-brass opacity-70 sm:block"
        >
          <path d="M8 8h144M8 8v144M40 40h88" fill="none" stroke="currentColor" strokeWidth="0.75" />
        </svg>
        <p className="text-sm tracking-wide text-slate">
          Investor Protection · Southern Cone Legal Strategy
        </p>
        <h1 className="mt-6 max-w-xl font-serif text-4xl leading-[1.15] text-navy sm:text-5xl lg:text-[3.4rem]">
          Cross-border financial fraud and asset recovery
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-slate">
          Legal strategy and coordination for investors and counsel across Uruguay, Brazil, and
          Argentina.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 bg-navy px-6 py-3 text-sm tracking-wide text-ivory transition-colors duration-300 hover:bg-brass hover:text-navy"
          >
            Get in touch
            <Arrow />
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center border border-navy/20 px-6 py-3 text-sm tracking-wide text-navy transition-colors duration-300 hover:border-brass"
          >
            Explore services
          </a>
        </div>
      </div>
      <div className="reveal relative order-2 min-h-[24rem] lg:min-h-full" data-reveal-delay="110">
        <Image
          src="/images/hero.jpg"
          alt="Glass towers of the World Trade Center in Montevideo against a deep blue evening sky"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="hero-photo object-cover object-[center_25%]"
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="line-draw pointer-events-none absolute inset-0 h-full w-full"
        >
          <line x1="16" y1="0" x2="16" y2="100" />
          <line x1="0" y1="78" x2="100" y2="78" />
          <line x1="62" y1="0" x2="100" y2="46" />
        </svg>
      </div>
    </section>
  );
}
