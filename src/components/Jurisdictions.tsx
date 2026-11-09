import { jurisdictions, serviceLanguages } from "@/lib/site";

export function Jurisdictions() {
  return (
    <section id="jurisdictions" className="scroll-mt-24 border-y border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="reveal">
          <h2 className="text-xs tracking-[0.18em] text-slate uppercase">Jurisdictions</h2>
          <p className="mt-3 font-serif text-xl text-navy sm:text-2xl">
            {jurisdictions.join(" · ")}
          </p>
        </div>
        <span aria-hidden="true" className="hidden h-10 w-px bg-brass/70 md:block" />
        <div className="reveal" data-reveal-delay="110">
          <h2 className="text-xs tracking-[0.18em] text-slate uppercase">Service languages</h2>
          <p className="mt-3 font-serif text-xl text-navy sm:text-2xl">
            {serviceLanguages.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}
