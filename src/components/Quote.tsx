import Image from "next/image";

export function Quote() {
  return (
    <section className="relative flex min-h-[26rem] items-center justify-center overflow-hidden px-6 py-24 md:min-h-[34rem]">
      <Image
        src="/images/quote.jpg"
        alt="Puente de la Mujer spanning the waterfront at Puerto Madero, Buenos Aires, at dusk"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-navy/75" />
      <figure className="reveal relative z-10 max-w-4xl text-center">
        <span aria-hidden="true" className="mx-auto mb-8 block h-px w-12 bg-brass" />
        <blockquote className="font-serif text-3xl leading-snug text-ivory sm:text-4xl md:text-5xl md:leading-tight">
          Your assets crossed a border. Your legal team should too.
        </blockquote>
      </figure>
    </section>
  );
}
