"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/home", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/asset-classes", label: "Asset Classes" },
  { href: "/my-assets", label: "My Assets" },
  { href: "/my-profile", label: "My Profile" },
  { href: "/token", label: "Token" },
  { href: "#", label: "About" },
] as const;

interface NavProps {
  active?: string;
  logoHref?: string;
}

export function Nav({ active, logoHref = "/" }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-[oklch(0.9_0.02_285)] bg-white sticky top-0 z-20">
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 md:px-8 py-4">
        <Link href={logoHref} className="flex items-center gap-2 shrink-0">
          <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded bg-primary text-primary-foreground font-bold text-base sm:text-lg">
            E
          </span>
          <span className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
            ENCLAVES
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm text-[oklch(0.35_0.02_285)]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`hover:text-foreground transition-colors ${
                active === link.label ? "text-primary font-medium" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 -mr-2 rounded-lg text-foreground hover:bg-muted/50 transition-colors touch-manipulation"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <nav
          className="lg:hidden border-t border-[oklch(0.9_0.02_285)] bg-white px-4 py-4"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm transition-colors touch-manipulation min-h-[44px] flex items-center ${
                    active === link.label
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-[oklch(0.35_0.02_285)] hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
