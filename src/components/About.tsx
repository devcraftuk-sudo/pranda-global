import Image from "next/image";
import { AboutMore } from "@/components/AboutMore";
import { about, biography, portraitAlt, portraitName, portraitSrc } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-20">
        <div className="reveal">
          {portraitSrc ? (
            <figure className="w-full max-w-xs">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={portraitSrc}
                  alt={portraitAlt}
                  fill
                  sizes="18rem"
                  className="object-cover object-[center_18%]"
                />
              </div>
              <figcaption className="mt-4 font-serif text-xl text-navy">{portraitName}</figcaption>
            </figure>
          ) : (
            <div className="flex aspect-[3/4] w-full max-w-xs items-end border border-dashed border-brass/80 bg-white p-6">
              <p className="text-sm leading-relaxed text-slate">
                Portrait to be supplied. This section stands as text until the client’s photograph
                is added.
              </p>
            </div>
          )}
        </div>
        <div className="reveal max-w-2xl" data-reveal-delay="110">
          <p className="text-xs tracking-[0.18em] text-slate uppercase">About</p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-navy sm:text-4xl">
            An institutional practice for cross-border matters
          </h2>
          <div className="md:hidden">
            <p className="mt-6 text-lg leading-relaxed text-slate">{about.introduction}</p>
            <p className="mt-5 leading-relaxed text-slate">{biography[0]}</p>
            <AboutMore paragraphs={biography.slice(1)} />
          </div>
          <div className="hidden md:block">
            <p className="mt-6 text-lg leading-relaxed text-slate">{about.introduction}</p>
            {biography.map((paragraph) => (
              <p key={paragraph} className="mt-5 leading-relaxed text-slate">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
