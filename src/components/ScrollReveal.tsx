"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const blocks = document.querySelectorAll<HTMLElement>(".reveal");

    if (reduce) {
      blocks.forEach((block) => block.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" },
    );

    blocks.forEach((block) => {
      const delay = block.dataset.revealDelay ?? "0";
      block.style.setProperty("--reveal-delay", `${delay}ms`);
      observer.observe(block);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
