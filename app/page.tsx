"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.98_0.01_285)]">
      <header className="border-b border-[oklch(0.9_0.02_285)] bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 md:px-8 py-4 max-w-6xl mx-auto">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded bg-primary text-primary-foreground font-bold text-base sm:text-lg">
              E
            </span>
            <span className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
              ENCLAVES
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm text-[oklch(0.35_0.02_285)]">
            <Link href="/assets" className="hover:text-foreground transition-colors">
              Assets
            </Link>
            <Link href="/how-it-works" className="hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link
              href="/home"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Launch App
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
        <section className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-4">
            Tokenize Real-World Assets
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Fractional ownership of real estate, infrastructure, and other real-world assets — with trust, verification, and compliance built in.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/home"
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
            >
              Launch App
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/tokenize"
              className="px-6 py-3 rounded-lg border border-[oklch(0.9_0.02_285)] bg-white font-semibold hover:bg-[oklch(0.98_0.01_285)] transition-colors inline-flex items-center justify-center"
            >
              Tokenize an Asset
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-2">Trust Scores</h3>
            <p className="text-sm text-muted-foreground">
              Transparent, reproducible trust classification for every asset — L, V, E, P, R components.
            </p>
          </div>
          <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-2">Multi-Party Verification</h3>
            <p className="text-sm text-muted-foreground">
              Independent verifiers, custodians, and registries — no single point of trust.
            </p>
          </div>
          <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-2">Regulated Infrastructure</h3>
            <p className="text-sm text-muted-foreground">
              DIFC, ADGM, Singapore — jurisdictional compliance built into the stack.
            </p>
          </div>
        </section>

        <section className="text-center">
          <Link
            href="/assets"
            className="text-primary font-medium hover:underline"
          >
            Browse all assets →
          </Link>
        </section>
      </main>
    </div>
  );
}
