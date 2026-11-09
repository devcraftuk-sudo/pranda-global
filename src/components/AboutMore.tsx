"use client";

import { useId, useState } from "react";

export function AboutMore({ paragraphs }: { paragraphs: readonly string[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div>
      <div
        className={`grid transition-[grid-template-rows] duration-450 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div id={panelId} className="min-h-0 overflow-hidden" inert={!open}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-5 leading-relaxed text-slate">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="mt-6 inline-flex items-center gap-2 text-sm tracking-wide text-navy"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? "See less" : "See more"}
        <Chevron open={open} />
      </button>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`h-4 w-4 transition-transform duration-450 ease-out motion-reduce:transition-none ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="M3.5 6 8 10.5 12.5 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}
