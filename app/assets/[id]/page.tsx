import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ALL_PLATFORM_ASSETS } from "@/lib/platform-assets-data";

export const dynamic = "force-dynamic";

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

export default async function AssetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const asset = ALL_PLATFORM_ASSETS.find((a) => a.id === id);

  if (!asset) {
    return (
      <div className="min-h-screen bg-[oklch(0.96_0.01_285)]">
        <Nav active="Assets" logoHref="/home" />
        <main className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Asset not found</h1>
          <p className="text-muted-foreground mb-6">The asset you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/assets" className="text-primary font-medium hover:underline">
            ← Back to All Assets
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[oklch(0.96_0.01_285)]">
      <Nav active="Assets" logoHref="/home" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        <Link
          href="/assets"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          ← All Assets
        </Link>

        <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white overflow-hidden shadow-sm">
          {/* Hero image */}
          <div className="aspect-video bg-[oklch(0.92_0.02_285)] relative overflow-hidden">
            {asset.hero.images[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={asset.hero.images[0].url}
                alt={asset.hero.images[0].alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-6xl">
                🏢
              </div>
            )}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                  STATUS_STYLES[asset.status] ?? "bg-neutral-200 text-neutral-800"
                }`}
              >
                {formatStatus(asset.status)}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-primary/90 text-primary-foreground">
                Class {asset.trust.class}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {asset.hero.title}
            </h1>
            <p className="text-muted-foreground mb-6">
              {asset.hero.asset_type_label} • {asset.issuer_name} • {asset.location.city}, {asset.location.country_name}
            </p>

            <p className="text-foreground mb-8">{asset.hero.description}</p>

            {/* Key stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 rounded-xl bg-[oklch(0.98_0.01_285)] border border-[oklch(0.95_0.02_285)]">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Total Value</p>
                <p className="text-xl font-bold text-foreground">
                  ${(asset.financials.valuation.amount_usd / 1_000_000).toFixed(2)}M
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Funded</p>
                <p className="text-xl font-bold text-foreground">
                  {asset.financials.funding.percent_funded}%
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Trust Score</p>
                <p className="text-xl font-bold text-foreground">
                  {asset.trust.score}
                  <span className="text-sm font-normal text-muted-foreground">/100</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Yield</p>
                <p className="text-xl font-bold text-foreground">
                  {asset.financials.yield.expected_annual_percent}%
                </p>
              </div>
            </div>

            {/* Funding bar */}
            <div className="mb-8">
              <div className="h-3 rounded-full bg-[oklch(0.92_0.02_285)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${asset.financials.funding.percent_funded}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                ${(asset.financials.funding.raised_usd / 1_000_000).toFixed(1)}M raised of $
                {(asset.financials.funding.target_usd / 1_000_000).toFixed(1)}M target • Min investment $
                {asset.financials.funding.min_investment_usd.toLocaleString()}
              </p>
            </div>

            {/* Key highlights */}
            {asset.hero.key_highlights.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                  Key Highlights
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {asset.hero.key_highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">•</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              href="/assets"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              ← Back to All Assets
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
