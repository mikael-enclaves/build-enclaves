/**
 * RWA Property Listing — Data structure for My Assets
 * Based on Enclaves RWA Property Listing spec
 */

export type AssetStatus =
  | "draft"
  | "under_review"
  | "funding"
  | "live"
  | "fully_funded"
  | "secondary_only"
  | "exited";

export type AssetType =
  | "apartment_block"
  | "land"
  | "commercial"
  | "villa"
  | "mixed_use"
  | "development"
  | "office"
  | "retail"
  | "warehouse"
  | "hotel";

export interface MyAssetListing {
  id: string;
  version: number;
  status: AssetStatus;
  created_at: string;
  updated_at: string;
  published_at: string | null;

  hero: {
    title: string;
    asset_type: AssetType;
    asset_type_label: string;
    images: { url: string; alt: string; is_hero?: boolean }[];
    key_highlights: string[];
    description: string;
  };

  location: {
    country: string;
    country_name: string;
    city: string;
    district: string;
    address_public: string;
    registry: {
      name: string;
      reference: string;
      status: "verified" | "pending" | "n_a";
    };
  };

  financials: {
    valuation: { amount_usd: number; provider: string; date: string };
    funding: {
      target_usd: number;
      raised_usd: number;
      percent_funded: number;
      token_price_usd: number;
      total_supply: number;
      tokens_sold: number;
      tokens_remaining: number;
      min_investment_usd: number;
    };
    yield: {
      expected_annual_percent: number;
      distribution_frequency: string;
      distribution_currency: string;
    };
  };

  property: {
    type: string;
    subtype: string;
    area_sqft: number;
    bedrooms?: number;
    bathrooms?: number;
    development_stage: string;
    tenure: string;
  };

  trust: {
    class: string;
    class_name: string;
    score: number;
    breakdown: { L: number; V: number; E: number; P: number; R: number };
  };

  token?: {
    blockchain: string;
    contract_address?: string;
    explorer_url?: string;
  };
}

const STATUS_LABELS: Record<AssetStatus, string> = {
  draft: "Draft",
  under_review: "Under Review",
  funding: "Funding",
  live: "Live",
  fully_funded: "Fully Funded",
  secondary_only: "Secondary Only",
  exited: "Exited",
};

const STATUS_STYLES: Record<AssetStatus, string> = {
  draft: "bg-neutral-200 text-neutral-800",
  under_review: "bg-amber-100 text-amber-800",
  funding: "bg-blue-100 text-blue-800",
  live: "bg-emerald-100 text-emerald-800",
  fully_funded: "bg-emerald-200 text-emerald-900",
  secondary_only: "bg-violet-100 text-violet-800",
  exited: "bg-neutral-300 text-neutral-700",
};

/** Mock data — in production, fetch from API for logged-in user */
export const MOCK_MY_ASSETS: MyAssetListing[] = [
  {
    id: "enc-prop-001",
    version: 1,
    status: "funding",
    created_at: "2026-03-01T00:00:00Z",
    updated_at: "2026-03-13T00:00:00Z",
    published_at: "2026-03-05T00:00:00Z",

    hero: {
      title: "Marina Bay Tower — Unit 4201",
      asset_type: "apartment_block",
      asset_type_label: "Apartment Block",
      images: [
        { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", alt: "Marina Bay Tower exterior", is_hero: true },
        { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", alt: "Interior living area" },
        { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", alt: "42nd floor sea view" },
      ],
      key_highlights: [
        "42nd floor penthouse with full sea view",
        "DLD-registered title deed on-chain",
        "7.2% projected annual yield",
        "Fully tenanted — 3-year lease in place",
      ],
      description:
        "Premium 4-bedroom penthouse in Marina Bay Tower with panoramic sea views. Fully furnished, currently tenanted on a 3-year corporate lease.",
    },

    location: {
      country: "AE",
      country_name: "United Arab Emirates",
      city: "Dubai",
      district: "Dubai Marina",
      address_public: "Dubai Marina, Dubai, UAE",
      registry: {
        name: "Dubai Land Department (DLD)",
        reference: "DLD-2026-048271",
        status: "verified",
      },
    },

    financials: {
      valuation: { amount_usd: 12_500_000, provider: "Knight Frank", date: "2026-01-20" },
      funding: {
        target_usd: 12_500_000,
        raised_usd: 10_250_000,
        percent_funded: 82,
        token_price_usd: 100,
        total_supply: 125_000,
        tokens_sold: 102_500,
        tokens_remaining: 22_500,
        min_investment_usd: 500,
      },
      yield: {
        expected_annual_percent: 7.2,
        distribution_frequency: "Quarterly",
        distribution_currency: "USDC",
      },
    },

    property: {
      type: "apartment_block",
      subtype: "Luxury Penthouse",
      area_sqft: 4200,
      bedrooms: 4,
      bathrooms: 5,
      development_stage: "Completed",
      tenure: "Freehold",
    },

    trust: {
      class: "I",
      class_name: "Sovereign Registry Anchored",
      score: 89,
      breakdown: { L: 81, V: 92, E: 100, P: 95, R: 70 },
    },

    token: {
      blockchain: "Ethereum",
      contract_address: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
      explorer_url: "https://etherscan.io/token/0x1a2b...#1",
    },
  },
  {
    id: "enc-prop-002",
    version: 1,
    status: "draft",
    created_at: "2026-03-10T00:00:00Z",
    updated_at: "2026-03-12T00:00:00Z",
    published_at: null,

    hero: {
      title: "Gate District 2 — Office Tower B",
      asset_type: "commercial",
      asset_type_label: "Commercial",
      images: [
        { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800", alt: "Office tower exterior", is_hero: true },
        { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800", alt: "Office interior" },
      ],
      key_highlights: [
        "Grade A office in DIFC",
        "6.5% expected yield",
        "ADGM SPV structure",
        "5-year weighted average lease",
      ],
      description:
        "Grade A office tower in Gate District 2, DIFC. Multi-tenant building with strong occupancy and institutional tenants.",
    },

    location: {
      country: "AE",
      country_name: "United Arab Emirates",
      city: "Dubai",
      district: "DIFC",
      address_public: "Gate District 2, DIFC, Dubai, UAE",
      registry: {
        name: "Dubai Land Department",
        reference: "DLD-2026-052xxx",
        status: "pending",
      },
    },

    financials: {
      valuation: { amount_usd: 8_500_000, provider: "CBRE", date: "2026-02-01" },
      funding: {
        target_usd: 8_500_000,
        raised_usd: 0,
        percent_funded: 0,
        token_price_usd: 100,
        total_supply: 85_000,
        tokens_sold: 0,
        tokens_remaining: 85_000,
        min_investment_usd: 1000,
      },
      yield: {
        expected_annual_percent: 6.5,
        distribution_frequency: "Quarterly",
        distribution_currency: "USDC",
      },
    },

    property: {
      type: "commercial",
      subtype: "Grade A Office",
      area_sqft: 15000,
      development_stage: "Completed",
      tenure: "Freehold",
    },

    trust: {
      class: "I",
      class_name: "Sovereign Registry Anchored",
      score: 0,
      breakdown: { L: 0, V: 0, E: 0, P: 0, R: 50 },
    },
  },
];

export { STATUS_LABELS, STATUS_STYLES };

/** Alias for My Assets page — replace with API fetch in production */
export const MY_ASSETS = MOCK_MY_ASSETS;
