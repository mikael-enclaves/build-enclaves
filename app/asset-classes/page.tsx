import Link from "next/link";
import { Nav } from "@/components/Nav";
import {
  TRUST_CLASSES,
  CATEGORIES,
  COUNTRIES,
  ASSET_CLASSES,
  TRUST_CLASS_SUMMARY,
  MARKET_STATS,
} from "@/lib/asset-classes-data";

const STATUS_COLORS: Record<string, string> = {
  LIVE: "bg-emerald-100 text-emerald-800",
  POSSIBLE: "bg-blue-100 text-blue-800",
  EMERGING: "bg-amber-100 text-amber-800",
  SANDBOX: "bg-violet-100 text-violet-800",
};

export default function AssetClassesPage() {
  const assetsByCategory = ASSET_CLASSES.reduce<Record<string, typeof ASSET_CLASSES>>((acc, asset) => {
    if (!acc[asset.category]) acc[asset.category] = [];
    acc[asset.category].push(asset);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[oklch(0.96_0.01_285)]">
      <Nav active="Asset Classes" logoHref="/home" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">Asset Classes</h1>
        <p className="text-muted-foreground mb-12">
          Tokenized real-world assets across trust tiers, categories, and jurisdictions.
        </p>

        {/* Trust Classes */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-primary" />
            Trust Classes (6 tiers)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TRUST_CLASSES.map((tc) => (
              <div
                key={tc.id}
                className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-foreground">
                    Class {tc.id} — {tc.name}
                  </h3>
                  <span className="text-xs font-medium text-primary">
                    Bonding: {tc.bond} · Risk: {tc.risk}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{tc.description}</p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Verification:</span> {tc.verification}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-primary" />
            Categories (12)
          </h2>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 rounded-lg border border-[oklch(0.9_0.02_285)] bg-white text-sm font-medium"
              >
                {cat}
              </span>
            ))}
          </div>
        </section>

        {/* Countries */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-primary" />
            Key Jurisdictions (10)
          </h2>
          <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[oklch(0.9_0.02_285)] bg-[oklch(0.98_0.01_285)]">
                  <th className="text-left py-3 px-4 font-medium">Country</th>
                  <th className="text-left py-3 px-4 font-medium">Trust Score (J)</th>
                </tr>
              </thead>
              <tbody>
                {COUNTRIES.map((c) => (
                  <tr key={c.name} className="border-b border-[oklch(0.9_0.02_285)] last:border-0">
                    <td className="py-3 px-4">
                      <span className="mr-2">{c.flag}</span>
                      {c.name}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{c.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Asset Classes (27) - Grouped by category */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-primary" />
            Asset Classes (27)
          </h2>
          {Object.entries(assetsByCategory).map(([category, assets]) => (
            <div key={category} className="mb-10">
              <h3 className="text-lg font-semibold text-foreground mb-4 text-primary">
                {category}
              </h3>
              <div className="space-y-3">
                {assets.map((asset) => (
                  <details
                    key={asset.id}
                    className="group rounded-xl border border-[oklch(0.9_0.02_285)] bg-white overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none hover:bg-[oklch(0.98_0.01_285)] transition-colors">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-mono text-muted-foreground">
                          {String(asset.id).padStart(2, "0")}
                        </span>
                        <span className="font-semibold text-foreground">{asset.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                          {asset.trustClass}
                        </span>
                        {asset.registryAnchored && (
                          <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            Registry
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <div className="px-6 pb-6 pt-0 border-t border-[oklch(0.9_0.02_285)]">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase mb-1">Market Size</p>
                          <p className="text-sm font-medium">{asset.marketSize}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase mb-1">Growth</p>
                          <p className="text-sm font-medium">{asset.growth}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase mb-1">Yield</p>
                          <p className="text-sm font-medium">{asset.yield}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase mb-1">Min Investment</p>
                          <p className="text-sm font-medium">{asset.minInvestment}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">{asset.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        <span className="font-medium text-foreground">Countries:</span>{" "}
                        {asset.countries.join(", ")}
                      </p>
                      {asset.registries && asset.registries.length > 0 && (
                        <div className="mt-4">
                          <p className="text-xs font-medium text-foreground uppercase mb-2">Registries</p>
                          <ul className="space-y-2">
                            {asset.registries.map((r) => (
                              <li key={`${r.country}-${r.status}`} className="text-sm">
                                <span
                                  className={`inline-block px-1.5 py-0.5 rounded text-xs font-medium mr-2 ${
                                    STATUS_COLORS[r.status] ?? "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {r.status}
                                </span>
                                <span className="font-medium">{r.country}:</span> {r.details}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {asset.custodians && asset.custodians.length > 0 && (
                        <div className="mt-4">
                          <p className="text-xs font-medium text-foreground uppercase mb-2">Custodians</p>
                          <ul className="space-y-1">
                            {asset.custodians.map((c) => (
                              <li key={c.country} className="text-sm">
                                <span className="font-medium">{c.country}:</span> {c.details}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {asset.keyIssuances && (
                        <p className="text-sm mt-2">
                          <span className="font-medium">Key:</span> {asset.keyIssuances.join("; ")}
                        </p>
                      )}
                      {asset.keyPlayers && (
                        <p className="text-sm mt-2">
                          <span className="font-medium">Players:</span> {asset.keyPlayers.join("; ")}
                        </p>
                      )}
                      {asset.platforms && (
                        <p className="text-sm mt-2">
                          <span className="font-medium">Platforms:</span> {asset.platforms.join("; ")}
                        </p>
                      )}
                      {asset.verification && (
                        <p className="text-sm mt-2 text-muted-foreground">
                          <span className="font-medium text-foreground">Verification:</span> {asset.verification}
                        </p>
                      )}
                      {asset.note && (
                        <p className="text-sm mt-2 text-amber-800 bg-amber-50 p-2 rounded">
                          {asset.note}
                        </p>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Trust Class Summary */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-primary" />
            Trust Class Distribution
          </h2>
          <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[oklch(0.9_0.02_285)] bg-[oklch(0.98_0.01_285)]">
                  <th className="text-left py-3 px-4 font-medium">Class</th>
                  <th className="text-left py-3 px-4 font-medium">Count</th>
                  <th className="text-left py-3 px-4 font-medium">Assets</th>
                </tr>
              </thead>
              <tbody>
                {TRUST_CLASS_SUMMARY.map((row) => (
                  <tr key={row.class} className="border-b border-[oklch(0.9_0.02_285)] last:border-0">
                    <td className="py-3 px-4 font-medium">{row.class}</td>
                    <td className="py-3 px-4">{row.count}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.assets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Key Market Stats */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-primary" />
            Key Market Stats (March 2026)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MARKET_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-4 flex justify-between items-center"
              >
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className="text-sm font-semibold text-foreground text-right max-w-[60%]">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
