"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ALL_PLATFORM_ASSETS } from "@/lib/platform-assets-data";

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-neutral-200 text-neutral-800",
  under_review: "bg-amber-100 text-amber-800",
  funding: "bg-blue-100 text-blue-800",
  live: "bg-emerald-100 text-emerald-800",
  fully_funded: "bg-violet-100 text-violet-800",
  secondary_only: "bg-sky-100 text-sky-800",
  exited: "bg-neutral-200 text-neutral-600",
};

function formatStatus(s: string) {
  return s
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function AllAssetsPage() {
  const totalTVL = ALL_PLATFORM_ASSETS.reduce(
    (sum, a) => sum + (a.financials?.funding?.raised_usd ?? 0),
    0
  );
  const totalValue = ALL_PLATFORM_ASSETS.reduce(
    (sum, a) => sum + (a.financials?.valuation?.amount_usd ?? 0),
    0
  );
  const issuerCount = new Set(ALL_PLATFORM_ASSETS.map((a) => a.issuer_name)).size;
  const categoryCounts = ALL_PLATFORM_ASSETS.reduce<Record<string, number>>((acc, a) => {
    const cat = a.hero.asset_type_label || "Other";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[oklch(0.96_0.01_285)]">
      <Nav active="Assets" logoHref="/home" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-1">All Assets</h1>
          <p className="text-muted-foreground">
            Tokenized real-world assets listed on the platform. Browse by name, category, and value.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Total TVL
            </p>
            <p className="text-2xl font-bold text-foreground">
              ${(totalTVL / 1_000_000).toFixed(2)}M
            </p>
            <p className="text-xs text-muted-foreground mt-1">Value locked</p>
          </div>
          <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Total Value
            </p>
            <p className="text-2xl font-bold text-foreground">
              ${(totalValue / 1_000_000).toFixed(2)}M
            </p>
            <p className="text-xs text-muted-foreground mt-1">Across all assets</p>
          </div>
          <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Issuers
            </p>
            <p className="text-2xl font-bold text-foreground">{issuerCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Active on platform</p>
          </div>
          <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Assets
            </p>
            <p className="text-2xl font-bold text-foreground">{ALL_PLATFORM_ASSETS.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Listed</p>
          </div>
        </div>

        {/* Assets by category */}
        <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-5 shadow-sm mb-8">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Assets by Category
          </p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(categoryCounts)
              .sort(([, a], [, b]) => b - a)
              .map(([cat, count]) => (
                <div
                  key={cat}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[oklch(0.98_0.01_285)] border border-[oklch(0.95_0.02_285)]"
                >
                  <span className="font-medium text-foreground">{cat}</span>
                  <span className="text-sm text-muted-foreground">({count})</span>
                </div>
              ))}
          </div>
        </div>

        <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[oklch(0.98_0.01_285)] text-muted-foreground text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-3 font-medium">Name</th>
                  <th className="text-left px-6 py-3 font-medium">Category</th>
                  <th className="text-left px-6 py-3 font-medium">Issuer</th>
                  <th className="text-right px-6 py-3 font-medium">Total Value</th>
                  <th className="text-left px-6 py-3 font-medium">Status</th>
                  <th className="text-left px-6 py-3 font-medium">Funded</th>
                  <th className="text-left px-6 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {ALL_PLATFORM_ASSETS.map((asset) => (
                  <tr
                    key={asset.id}
                    className="border-t border-[oklch(0.95_0.02_285)] hover:bg-[oklch(0.98_0.01_285)]"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/assets/${asset.id}`}
                        className="font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {asset.hero.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {asset.hero.asset_type_label}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {asset.issuer_name}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-foreground">
                      ${(asset.financials.valuation.amount_usd / 1_000_000).toFixed(2)}M
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          STATUS_STYLES[asset.status] ?? "bg-neutral-200 text-neutral-800"
                        }`}
                      >
                        {formatStatus(asset.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {asset.financials.funding.percent_funded}%
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/assets/${asset.id}`}
                        className="text-primary font-medium text-sm hover:underline"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          {ALL_PLATFORM_ASSETS.length} assets listed on the platform.
        </p>
      </main>
    </div>
  );
}
