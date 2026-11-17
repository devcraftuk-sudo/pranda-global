"use client";

import Image from "next/image";
import { useState } from "react";
import { Arrow } from "@/components/Arrow";
import { pressItems } from "@/lib/site";

const controlClass =
  "flex h-11 w-11 items-center justify-center border border-navy/20 text-navy transition-colors duration-300 hover:border-brass";

export function Press() {
  const [index, setIndex] = useState(0);
  const count = pressItems.length;
  const item = pressItems[index];
  const position = `${String(index + 1).padStart(2, "0")} of ${String(count).padStart(2, "0")}`;

  function step(delta: number) {
    setIndex((current) => (current + delta + count) % count);
  }

  return (
    <section id="press" aria-roledescription="carousel" className="scroll-mt-24 bg-linen px-6 py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-20">
        <div className="order-2 lg:order-1">
          <p className="text-xs tracking-[0.18em] text-slate uppercase">Press</p>
          <div key={item.image} className="press-fade" aria-live="polite">
            <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight text-navy sm:text-4xl">
              {item.title}
            </h2>
          </div>
          <div className="mt-10 flex items-center gap-5">
            <button type="button" className={controlClass} aria-label="Previous story" onClick={() => step(-1)}>
              <Chevron direction="left" />
            </button>
            <p className="min-w-24 text-center font-serif text-lg text-navy">
              <span className="sr-only">{position}</span>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
                <span className="mx-2 text-brass">—</span>
                {String(count).padStart(2, "0")}
              </span>
            </p>
            <button type="button" className={controlClass} aria-label="Next story" onClick={() => step(1)}>
              <Chevron direction="right" />
            </button>
          </div>
        </div>
        <div key={item.image} className="press-fade relative order-1 lg:order-2">
          <Image
            src={item.image}
            alt={item.alt}
            width={1136}
            height={1408}
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="h-auto w-full"
          />
          <div
            aria-hidden="true"
            className="press-mask pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
          />
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group absolute bottom-8 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 border border-navy/20 bg-linen px-5 py-3 text-sm tracking-wide text-navy transition-colors duration-300 hover:border-brass"
          >
            See more
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4">
      <path
        d={direction === "left" ? "M10 3.5 5.5 8 10 12.5" : "M6 3.5 10.5 8 6 12.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}
