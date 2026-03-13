import Link from "next/link";
import { Nav } from "@/components/Nav";
import { MY_ASSETS } from "@/lib/my-assets-data";

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-neutral-200 text-neutral-800",
  under_review: "bg-amber-100 text-amber-800",
  funding: "bg-blue-100 text-blue-800",
  live: "bg-emerald-100 text-emerald-800",
  fully_funded: "bg-violet-100 text-violet-800",
  secondary_only: "bg-sky-100 text-sky-800",
  exited: "bg-neutral-200 text-neutral-600",
};

const ASSET_TYPE_LABELS: Record<string, string> = {
  apartment_block: "Apartment Block",
  land: "Land",
  commercial: "Commercial",
  villa: "Villa",
  mixed_use: "Mixed-Use",
  development: "Development",
  office: "Office",
  retail: "Retail",
  warehouse: "Warehouse",
  hotel: "Hotel",
};

function formatStatus(s: string) {
  return s
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function MyAssetsPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.96_0.01_285)]">
      <Nav active="My Assets" logoHref="/home" />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-10">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">My Assets</h1>
            <p className="text-muted-foreground">
              Assets you&apos;ve tokenized for sale. Manage listings and track funding progress.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            + Tokenize New Asset
          </Link>
        </div>

        {MY_ASSETS.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-[oklch(0.9_0.02_285)] bg-white p-16 text-center">
            <p className="text-muted-foreground mb-2">No assets yet</p>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Start the onboarding flow to tokenize your first real-world asset.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Begin Onboarding
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {MY_ASSETS.map((asset) => (
              <Link
                key={asset.id}
                href={`/my-assets/${asset.id}`}
                className="block rounded-xl border border-[oklch(0.9_0.02_285)] bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Hero image */}
                  <div className="md:w-72 shrink-0 aspect-video md:aspect-square bg-[oklch(0.92_0.02_285)] relative overflow-hidden">
                    {asset.hero.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={asset.hero.images[0].url}
                        alt={asset.hero.images[0].alt}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-4xl">
                        {asset.hero.asset_type === "apartment_block" ? "🏢" : "🏠"}
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
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

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-2">
                        {asset.hero.title}
                      </h2>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                        <span>
                          {ASSET_TYPE_LABELS[asset.hero.asset_type] ?? asset.hero.asset_type}
                        </span>
                        <span>•</span>
                        <span>
                          {asset.location.city}, {asset.location.country_name}
                        </span>
                        <span>•</span>
                        <span>{asset.location.district}</span>
                      </div>

                      {/* Key stats row */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase">Trust Score</p>
                          <p className="font-bold text-foreground">
                            {asset.trust.score}
                            <span className="text-muted-foreground font-normal text-sm">/100</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase">Valuation</p>
                          <p className="font-bold text-foreground">
                            ${(asset.financials.valuation.amount_usd / 1_000_000).toFixed(1)}M
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase">Funded</p>
                          <p className="font-bold text-foreground">
                            {asset.financials.funding.percent_funded}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase">Yield</p>
                          <p className="font-bold text-foreground">
                            {asset.financials.yield.expected_annual_percent}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase">Min Invest</p>
                          <p className="font-bold text-foreground">
                            ${asset.financials.funding.min_investment_usd.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Funding progress bar */}
                      <div>
                        <div className="h-2 rounded-full bg-[oklch(0.92_0.02_285)] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${asset.financials.funding.percent_funded}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          ${(asset.financials.funding.raised_usd / 1_000_000).toFixed(1)}M raised of $
                          {(asset.financials.funding.target_usd / 1_000_000).toFixed(1)}M target
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[oklch(0.9_0.02_285)] flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {asset.published_at
                          ? `Listed ${new Date(asset.published_at).toLocaleDateString()}`
                          : `Updated ${new Date(asset.updated_at).toLocaleDateString()}`}
                      </p>
                      <span className="text-sm font-medium text-primary">View details →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
