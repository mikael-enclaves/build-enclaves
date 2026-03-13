"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { MY_ASSETS } from "@/lib/my-assets-data";

const ACTIVITY = [
  { time: "14:32", action: "Login", detail: "Mohammed Al-Rashid", link: "/my-profile" },
  { time: "12:15", action: "New investor", detail: "Marina Bay Tower +$50,000", link: "/my-assets" },
  { time: "10:02", action: "KYB renewal", detail: "Completed", link: "/my-profile" },
  { time: "09:45", action: "Distribution", detail: "Gate District — $12,400 paid", link: "/my-assets" },
  { time: "Mar 12", action: "Asset submitted", detail: "Marina Bay Tower", link: "/my-assets" },
];

const NEWS = [
  { date: "Mar 13", title: "DIFC updates tokenization framework", source: "DFSA" },
  { date: "Mar 12", title: "VARA issues guidance on RWA classification", source: "VARA" },
  { date: "Mar 11", title: "Enclaves partners with Chainlink for oracles", source: "Enclaves" },
];

const PARTNERS = [
  { name: "Chainlink", desc: "Oracles" },
  { name: "Fireblocks", desc: "Custody" },
  { name: "Sumsub", desc: "KYC/KYB" },
  { name: "OpenZeppelin", desc: "Security" },
];

function formatStatus(s: string) {
  return s.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default function HomePage() {
  const totalValuation = MY_ASSETS.reduce(
    (sum, a) => sum + (a.financials?.valuation?.amount_usd || a.financials?.funding?.target_usd || 0),
    0
  );
  const totalRaised = MY_ASSETS.reduce((sum, a) => sum + (a.financials?.funding?.raised_usd || 0), 0);
  const enclBalance = 125000;
  const enclStaked = 200000;
  const profileCompletion = 62;

  return (
    <div className="min-h-screen bg-[oklch(0.96_0.01_285)]">
      <Nav active="Home" logoHref="/home" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        {/* Terminal prompt */}
        <div className="mb-8 font-mono">
          <p className="text-primary text-sm">
            enclaves:~$ <span className="text-foreground font-medium">dashboard --refresh</span>
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            Last updated: {new Date().toISOString().slice(0, 19).replace("T", " ")} UTC
          </p>
        </div>

        {/* Grid: Balances, Profile, Assets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Balance */}
          <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-primary font-bold text-sm uppercase tracking-wider">
                ┌─ Balance
              </h2>
              <Link href="/my-profile#section-6" className="text-xs text-primary hover:underline">
                → Wallet
              </Link>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">ENCL available</p>
                <p className="text-primary font-bold">{enclBalance.toLocaleString()} ENCL</p>
              </div>
              <div>
                <p className="text-muted-foreground">ENCL staked</p>
                <p className="text-foreground font-bold">{enclStaked.toLocaleString()} ENCL</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total tokenized value</p>
                <p className="text-primary font-bold">${(totalValuation / 1e6).toFixed(2)}M</p>
              </div>
              <div>
                <p className="text-muted-foreground">Raised to date</p>
                <p className="text-foreground font-bold">${(totalRaised / 1e6).toFixed(2)}M</p>
              </div>
            </div>
          </div>

          {/* Profile snapshot */}
          <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-primary font-bold text-sm uppercase tracking-wider">
                ┌─ My Profile
              </h2>
              <Link href="/my-profile" className="text-xs text-primary hover:underline">
                → Full Profile
              </Link>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Completion</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded bg-[oklch(0.9_0.02_285)] overflow-hidden">
                    <div
                      className="h-full rounded bg-primary"
                      style={{ width: `${profileCompletion}%` }}
                    />
                  </div>
                  <span className="text-primary font-bold">{profileCompletion}%</span>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <p className="text-emerald-600 font-medium">KYB Verified</p>
              </div>
              <div>
                <p className="text-muted-foreground">Next action</p>
                <p className="text-amber-700 font-medium">Reach 80% for live issuance</p>
              </div>
            </div>
          </div>

          {/* Assets snapshot */}
          <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-primary font-bold text-sm uppercase tracking-wider">
                ┌─ My Assets
              </h2>
              <Link href="/my-assets" className="text-xs text-primary hover:underline">
                → All Assets
              </Link>
            </div>
            <div className="space-y-2 text-sm">
              {MY_ASSETS.slice(0, 3).map((a) => (
                <Link
                  key={a.id}
                  href={`/my-assets#${a.id}`}
                  className="block rounded-lg border border-[oklch(0.9_0.02_285)] p-3 hover:border-primary/50 transition-colors"
                >
                  <p className="text-foreground font-medium truncate">{a.hero.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {formatStatus(a.status)} · {(a.financials?.funding?.percent_funded || 0).toFixed(0)}% funded
                  </p>
                </Link>
              ))}
              {MY_ASSETS.length === 0 && (
                <p className="text-muted-foreground">No assets yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Two columns: Activity + News / Partners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity */}
          <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6 shadow-sm">
            <h2 className="text-primary font-bold text-sm uppercase tracking-wider mb-4">
              ┌─ Activity
            </h2>
            <div className="space-y-2 text-sm font-mono">
              {ACTIVITY.map((item, i) => (
                <Link
                  key={i}
                  href={item.link}
                  className="flex gap-4 py-2 border-b border-[oklch(0.9_0.02_285)] last:border-0 hover:text-primary transition-colors"
                >
                  <span className="text-muted-foreground shrink-0">{item.time}</span>
                  <span className="text-primary shrink-0">{item.action}</span>
                  <span className="text-foreground truncate">{item.detail}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* News + Partners */}
          <div className="space-y-6">
            <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6 shadow-sm">
              <h2 className="text-primary font-bold text-sm uppercase tracking-wider mb-4">
                ┌─ News &amp; Updates
              </h2>
              <div className="space-y-3 text-sm">
                {NEWS.map((n, i) => (
                  <div key={i} className="flex gap-3 py-2 border-b border-[oklch(0.9_0.02_285)] last:border-0">
                    <span className="text-muted-foreground shrink-0">{n.date}</span>
                    <div>
                      <p className="text-foreground">{n.title}</p>
                      <p className="text-muted-foreground text-xs">{n.source}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6 shadow-sm">
              <h2 className="text-primary font-bold text-sm uppercase tracking-wider mb-4">
                ┌─ Partners &amp; Integrations
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {PARTNERS.map((p, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-[oklch(0.9_0.02_285)] p-3 hover:border-primary/30 transition-colors"
                  >
                    <p className="text-foreground font-medium">{p.name}</p>
                    <p className="text-muted-foreground text-xs">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-8 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6 shadow-sm">
          <h2 className="text-primary font-bold text-sm uppercase tracking-wider mb-4">
            ┌─ Quick Links
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/my-assets" className="text-primary hover:underline text-sm">
              My Assets
            </Link>
            <Link href="/my-profile" className="text-primary hover:underline text-sm">
              My Profile
            </Link>
            <Link href="/token" className="text-primary hover:underline text-sm">
              ENCL Token
            </Link>
            <Link href="/asset-classes" className="text-primary hover:underline text-sm">
              Asset Classes
            </Link>
            <Link href="/how-it-works" className="text-primary hover:underline text-sm">
              How It Works
            </Link>
            <Link href="/" className="text-primary hover:underline text-sm">
              + Tokenize New Asset
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
