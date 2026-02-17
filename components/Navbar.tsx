"use client";

import Image from "next/image";
import Link from "next/link";

const LOGO_SRC = "https://res.cloudinary.com/dr3dhkvwq/image/upload/v1770911582/childrenlk/super-hero/ngvkzgdhmmzdreyviuxx.png";

const navItems = [
  { label: "Home", href: "/", className: "navbar-link-home" },
  { label:"Events", href: "/events", className: "navbar-link-events" },
  { label: "Resource Hub", href: "/resource-hub", className: "navbar-link-resource" },
  { label: "Learning Hub", href: "/learning-hub", className: "navbar-link-learning" },
  { label: "Super Hero Hub", href: "/super-hero-hub", className: "navbar-link-super-hero" },
  { label: "Media Hub", href: "/media-hub", className: "navbar-link-media" },
] as const;

function RainbowIcon() {
  return (
    <svg
      width="28"
      height="14"
      viewBox="0 0 28 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M2 12C2 12 6 2 14 2C22 2 26 12 26 12"
        stroke="#FF6B6B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 11C3 11 6.5 3 14 3C21.5 3 25 11 25 11"
        stroke="#FFD93D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 10C4 10 7 4 14 4C21 4 24 10 24 10"
        stroke="#6BCB77"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 9C5 9 7.5 5 14 5C20.5 5 23 9 23 9"
        stroke="#4D96FF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 8C6 8 8 6 14 6C20 6 22 8 22 8"
        stroke="#9B59B6"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white shrink-0">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white shrink-0">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white shrink-0">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white shrink-0">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header className="w-full overflow-visible font-sans">
      {/* Top bar */}
      {/* <div className="navbar-top-bar flex items-center justify-between px-4 py-1.5">
        <div className="flex items-center">
          <RainbowIcon />
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="p-0.5 transition opacity-90 hover:opacity-100" aria-label="Globe">
            <GlobeIcon />
          </a>
          <a href="#" className="p-0.5 transition opacity-90 hover:opacity-100" aria-label="Star">
            <StarIcon />
          </a>
          <a href="#" className="p-0.5 transition opacity-90 hover:opacity-100" aria-label="Twitter">
            <TwitterIcon />
          </a>
          <a href="#" className="p-0.5 transition opacity-90 hover:opacity-100" aria-label="Email">
            <EnvelopeIcon />
          </a>
        </div>
      </div> */}

      {/* Main nav bar with wavy bottom */}
      <div className="navbar-main navbar-wave-wrap">
        <nav className="flex items-center justify-between gap-6 px-4 py-3 pr-6">
          {/* Logo - left */}
          <div className="flex shrink-0 items-center">
            <Image
              src={LOGO_SRC}
              alt="Children.lk Logo"
              width={120}
              height={56}
              className="h-12 w-auto object-contain object-left sm:h-14"
            />
          </div>

          {/* Nav links: stuck to the right */}
          <div className="ml-auto flex gap-6 sm:gap-8 md:gap-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-sans text-2xl font-medium no-underline transition hover:opacity-80 sm:text-base ${item.className}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
