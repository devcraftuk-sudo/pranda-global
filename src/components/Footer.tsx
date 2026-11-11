import { safeHttpUrl } from "@/lib/links";
import {
  company,
  contactChannels,
  footerServiceLinks,
  publicEmail,
  type ContactChannelId,
} from "@/lib/site";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function contactButtons() {
  return contactChannels.map((channel) => {
    if (channel.id === "email") {
      const address = publicEmail.trim();
      const href = EMAIL_PATTERN.test(address) ? `mailto:${address}` : "";
      return { ...channel, href, external: false };
    }
    return { ...channel, href: safeHttpUrl(channel.href), external: true };
  });
}

const channelClass =
  "flex h-11 w-11 items-center justify-center rounded-full bg-navy text-ivory transition-colors duration-300 hover:bg-[#243656]";

export function Footer({ privacyUrl }: { privacyUrl: string }) {
  const channels = contactButtons();

  return (
    <footer className="border-t border-line bg-sand text-navy">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-16 sm:py-20 md:grid-cols-3 md:items-start md:gap-12 lg:gap-16 lg:py-24">
        <div className="reveal">
          <h2 className="text-xs tracking-[0.18em] text-navy uppercase">Company</h2>
          <address className="mt-6 space-y-1 not-italic leading-relaxed">
            <p className="font-serif text-xl">{company.legalName}</p>
            <p className="pt-3">{company.taxId}</p>
            <p>{company.street}</p>
            <p>{company.country}</p>
          </address>
          <p className="mt-6 text-sm leading-relaxed">{company.copyright}</p>
          {privacyUrl ? (
            <a
              href={privacyUrl}
              className="mt-4 inline-block text-sm underline decoration-navy/40 underline-offset-4 transition-colors duration-300 hover:text-brass hover:decoration-brass"
            >
              Privacy Policy
            </a>
          ) : null}
        </div>

        <nav className="reveal" aria-label="Services" data-reveal-delay="110">
          <h2 className="text-xs tracking-[0.18em] text-navy uppercase">Services</h2>
          <ul className="mt-6 space-y-3">
            {footerServiceLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="underline decoration-navy/40 underline-offset-4 transition-colors duration-300 hover:text-brass hover:decoration-brass"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="reveal" data-reveal-delay="220">
          <h2 className="text-xs tracking-[0.18em] text-navy uppercase">Contact</h2>
          <ul className="mt-6 grid w-fit grid-cols-4 gap-3">
            {channels.map((channel) => (
              <li key={channel.id}>
                {channel.href ? (
                  <a
                    href={channel.href}
                    aria-label={channel.label}
                    className={channelClass}
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <ChannelIcon id={channel.id} />
                  </a>
                ) : (
                  <button type="button" aria-label={channel.label} className={channelClass}>
                    <ChannelIcon id={channel.id} />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function ChannelIcon({ id }: { id: ContactChannelId }) {
  const common = {
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (id === "instagram") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (id === "email") {
    return (
      <svg {...common}>
        <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
        <path d="m4.5 7 7.5 6L19.5 7" />
      </svg>
    );
  }
  if (id === "location") {
    return (
      <svg {...common}>
        <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
        <circle cx="12" cy="11" r="2" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M6.5 18.5 7.2 16A7 7 0 1 1 9 17.2l-2.5 1.3Z" />
      <path d="M9.2 10.2c.2-.4.4-.4.7-.4h.6c.2 0 .4 0 .5.4.2.5.6 1.6.6 1.7 0 .2 0 .4-.2.6l-.3.4c-.1.2-.1.3 0 .5.2.4.8 1.3 1.7 1.8.7.3 1 .3 1.2.2.2-.1.8-.7 1-.9.1-.2.3-.2.5-.1l1.4.7c.2.1.4.2.4.4.1.5-.1 1.4-.7 1.9-.5.4-1.2.6-2 .5-1.6-.2-3.6-1.4-5-3.2-1.1-1.4-1.8-2.8-1.9-3.6-.1-.6.2-1.2.6-1.6Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
