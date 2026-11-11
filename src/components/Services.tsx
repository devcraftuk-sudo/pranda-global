import { services } from "@/lib/site";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-linen px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal">
          <p className="text-xs tracking-[0.18em] text-slate uppercase">Services</p>
          <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight text-navy sm:text-4xl">
            Counsel for matters that cross a border
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate">
            Engagements are scoped to the matter and coordinated with the investors, families, and
            counsel already involved.
          </p>
        </div>
        <div className="mt-16">
          {services.map((service, index) => (
            <article
              key={service.number}
              id={service.id}
              className="reveal scroll-mt-24 grid gap-6 border-t border-line py-12 md:grid-cols-[7rem_1fr] md:gap-12 md:py-14"
              data-reveal-delay={index * 120}
            >
                <p className="font-serif text-3xl text-navy">
                  {service.number}
                  <span aria-hidden="true" className="mt-3 block h-px w-8 bg-brass" />
                </p>
                <div>
                  <h3 className="font-serif text-2xl text-navy">{service.title}</h3>
                  <p className="mt-4 max-w-2xl leading-relaxed text-slate">{service.description}</p>
                  <p className="mt-6 text-sm leading-relaxed text-navy">
                    <span className="mr-2 text-xs tracking-[0.16em] text-slate uppercase">
                      Who we help
                    </span>
                    {service.audience}
                  </p>
                </div>
              </article>
          ))}
        </div>
      </div>
    </section>
  );
}
