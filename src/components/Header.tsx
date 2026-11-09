"use client";

import { useEffect, useId, useRef, useState } from "react";
import { firmComplement, firmName, navLinks } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    function closeOnDesktop() {
      if (query.matches) setOpen(false);
    }
    query.addEventListener("change", closeOnDesktop);
    return () => query.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-6 px-6 py-3">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-serif text-xl tracking-tight text-navy">{firmName}</span>
          <span className="mt-1.5 text-[0.7rem] tracking-wide text-slate">{firmComplement}</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-slate transition-colors duration-300 hover:text-navy"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          ref={buttonRef}
          type="button"
          className="text-sm tracking-wide text-navy md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <div
        ref={menuRef}
        id={menuId}
        hidden={!open}
        className="border-t border-line md:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col px-6 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="border-b border-line py-4 text-base text-navy last:border-b-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
