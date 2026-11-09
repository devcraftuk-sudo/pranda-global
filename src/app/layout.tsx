import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fraunces",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: "Pranda Global — Cross-border financial fraud and asset recovery",
  description:
    "Legal strategy and coordination for investors and counsel across Uruguay, Brazil, and Argentina.",
  openGraph: {
    title: "Pranda Global — Patricia Regules and Associates",
    description:
      "Legal strategy and coordination for investors and counsel across Uruguay, Brazil, and Argentina.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-ivory font-sans text-navy">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-ivory focus:px-4 focus:py-2 focus:text-navy"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
