import Link from "next/link";

const SECTIONS = [
  "Company Identity",
  "People & Access Control",
  "KYC / KYB Verification Status",
  "Company Registration & Legal",
  "Contact & Communications",
  "Wallet & ENCL Holdings",
  "Legal & Professional Services",
  "Regulatory Status",
  "Advisors & Board",
  "Track Record & Reputation",
  "Linked Assets",
  "Compliance & Monitoring",
  "Documents Vault",
  "Activity Log",
];

export default function MyProfilePage() {
  const completionPercent = 62; // Mock: Verified tier

  return (
    <div className="min-h-screen bg-[oklch(0.96_0.01_285)]">
      <header className="border-b border-[oklch(0.9_0.02_285)] bg-white sticky top-0 z-20">
        <div className="flex items-center gap-8 px-8 py-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="flex items-center justify-center w-10 h-10 rounded bg-primary text-primary-foreground font-bold text-lg">
              E
            </span>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              ENCLAVES
            </span>
          </Link>
          <nav className="flex items-center gap-8 text-sm text-[oklch(0.35_0.02_285)]">
            <Link href="/home" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/how-it-works" className="hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="/asset-classes" className="hover:text-foreground transition-colors">
              Asset Classes
            </Link>
            <Link href="/my-assets" className="hover:text-foreground transition-colors">
              My Assets
            </Link>
            <Link href="/my-profile" className="text-primary font-medium">
              My Profile
            </Link>
            <Link href="/token" className="hover:text-foreground transition-colors">
              Token
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">Enclaves — My Profile</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Issuer Identity, Compliance & Readiness
        </p>
        <p className="text-muted-foreground mb-8">
          The My Profile page is the issuer&apos;s permanent, verifiable identity within Enclaves. It serves three audiences: the issuer themselves (manage their account), investors (due diligence on who they&apos;re dealing with), and regulators/auditors (compliance verification). Every field exists to protect investors and create accountability.
        </p>

        {/* Profile Completion Score */}
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Profile Completion</h2>
            <span className="text-2xl font-bold text-primary">{completionPercent}%</span>
          </div>
          <div className="h-3 rounded-full bg-[oklch(0.9_0.02_285)] overflow-hidden mb-4">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {[
              { tier: "Basic (40%)", done: true, label: "Company name, contact, entity docs" },
              { tier: "Verified (60%)", done: true, label: "KYB complete, KYC primary, wallet" },
              { tier: "Professional (80%)", done: false, label: "Legal, auditor, regulatory, UBO" },
              { tier: "Institutional (95%+)", done: false, label: "Full docs vault, compliance officer" },
            ].map((t) => (
              <div
                key={t.tier}
                className={`rounded-lg p-3 border ${
                  t.done
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-[oklch(0.9_0.02_285)] bg-white"
                }`}
              >
                <p className="font-medium text-foreground">{t.tier}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Asset submission requires 60%+. Going live requires 80%+. Institutional badge at 95%+.
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6 mb-12 shadow-sm">
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Contents</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {SECTIONS.map((s, i) => (
              <li key={i}>
                <a href={`#section-${i + 1}`} className="text-foreground hover:text-primary transition-colors">
                  {i + 1}. {s}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Section Content */}
        <article className="space-y-12">
          {/* 1. Company Identity */}
          <section id="section-1" className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              1. Company Identity
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              The face of the issuer. Verified, not self-declared.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {[
                ["Company legal name", "Enclave Holdings DMCC"],
                ["Trading name", "Enclave Holdings"],
                ["Company type", "Limited Company"],
                ["Country of incorporation", "UAE (DIFC)"],
                ["Date of incorporation", "2024-03-15"],
                ["Registration number", "DIFC-2024-00842"],
                ["Tax ID / VAT", "100XXXXX"],
                ["LEI", "Not applicable"],
                ["Industry", "Real Estate / Asset Management"],
                ["Verification badge", "KYB Verified"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground uppercase">{label}</p>
                  <p className="font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Company description: UAE-based real estate investment firm specialising in premium residential and commercial properties. Website: enclaveholdings.com
            </p>
          </section>

          {/* 2. People & Access Control */}
          <section id="section-2" className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              2. People & Access Control
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Every person with access, their role, and verification status. No anonymous operators.
            </p>
            <div className="space-y-4">
              <div className="rounded-lg border border-[oklch(0.9_0.02_285)] p-4">
                <p className="font-bold text-foreground">Primary Account Holder</p>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <p><span className="text-muted-foreground">Name:</span> Mohammed Al-Rashid</p>
                  <p><span className="text-muted-foreground">Role:</span> CEO</p>
                  <p><span className="text-muted-foreground">Email:</span> mo@enclaveholdings.com ✓</p>
                  <p><span className="text-muted-foreground">KYC:</span> Verified</p>
                  <p><span className="text-muted-foreground">PEP:</span> No</p>
                  <p><span className="text-muted-foreground">2FA:</span> Enabled</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Access Levels</p>
                <p className="text-xs text-muted-foreground">
                  Admin — full control | Manager — submit assets, upload docs | Viewer — read-only | Finance — wallet, staking
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Beneficial Owners (UBO)</p>
                <p className="text-sm text-muted-foreground">
                  Full name, ownership %, nationality, KYC status, PEP, sanctions screening — per AML requirements.
                </p>
              </div>
            </div>
          </section>

          {/* 3. KYC / KYB Verification */}
          <section id="section-3" className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              3. KYC / KYB Verification Status
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Master compliance dashboard. Entity-level KYB, per-person KYC, AML screening.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
                <p className="font-bold text-foreground">KYB — Entity</p>
                <p className="text-emerald-700 font-medium">Verified</p>
                <p className="text-xs text-muted-foreground mt-1">Provider: Sumsub · Verified 2026-01-15</p>
                <p className="text-xs text-muted-foreground">Level: Standard</p>
              </div>
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
                <p className="font-bold text-foreground">KYC — People</p>
                <p className="text-emerald-700 font-medium">1/1 Verified</p>
                <p className="text-xs text-muted-foreground mt-1">Primary holder complete</p>
              </div>
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
                <p className="font-bold text-foreground">AML Screening</p>
                <p className="text-emerald-700 font-medium">Clear</p>
                <p className="text-xs text-muted-foreground mt-1">Last screened: 2026-01-15</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Documents verified: Certificate of incorporation ✓, M&A ✓, Register of directors ✓, UBO ✓, Proof of address ✓. Outstanding: None.
            </p>
          </section>

          {/* 4. Company Registration & Legal */}
          <section id="section-4" className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              4. Company Registration & Legal
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Legal paper trail. Registration authority, status, filings.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {[
                ["Registration authority", "DIFC Registrar"],
                ["Company status", "Active"],
                ["Registered address", "Gate District 2, DIFC, Dubai, UAE"],
                ["Jurisdiction", "DIFC (Dubai)"],
                ["Last annual return", "2025-06-30"],
                ["Financial year end", "December 31"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground uppercase">{label}</p>
                  <p className="font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Contact & Communications */}
          <section id="section-5" className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              5. Contact & Communications
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              How to reach the issuer. Multiple verified channels.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {[
                ["Primary email", "mo@enclaveholdings.com ✓"],
                ["Primary phone", "+971 50 xxx xxxx ✓"],
                ["Investor relations", "ir@enclaveholdings.com"],
                ["Compliance officer", "compliance@enclaveholdings.com"],
                ["Timezone", "GST (UTC+4)"],
                ["Preferred language", "English"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground uppercase">{label}</p>
                  <p className="font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Wallet & ENCL Holdings */}
          <section id="section-6" className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              6. Wallet & ENCL Holdings
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Economic accountability. Balance, stakes, bonding coverage, transaction history.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Primary Wallet</p>
                <p className="font-mono text-sm text-foreground">0x1a2b...ef12</p>
                <p className="text-xs text-muted-foreground">Ethereum · MetaMask · Last connected: 2026-03-13</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">ENCL Balance</p>
                <p className="font-bold text-foreground">125,000 ENCL</p>
                <p className="text-sm text-muted-foreground">~$187,500 USD equivalent</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Total Staked</p>
                <p className="font-bold text-foreground">200,000 ENCL</p>
                <p className="text-sm text-muted-foreground">Required: 187,500 · Bonding: 107%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Staking by Asset</p>
                <p className="text-sm text-foreground">Marina Bay Tower — Fully bonded</p>
              </div>
            </div>
          </section>

          {/* 7. Legal & Professional Services */}
          <section id="section-7" className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              7. Legal & Professional Services
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Legal counsel, auditor, custodian, valuation provider, insurance broker, tax advisor.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-[oklch(0.9_0.02_285)]">
                <span className="font-medium">Legal Counsel</span>
                <span className="text-muted-foreground">Al Tamimi & Company · DIFC · Active</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[oklch(0.9_0.02_285)]">
                <span className="font-medium">Auditor</span>
                <span className="text-muted-foreground">Deloitte · Financial · Active</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[oklch(0.9_0.02_285)]">
                <span className="font-medium">Valuation</span>
                <span className="text-muted-foreground">Knight Frank · RICS · Active</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium">Insurance</span>
                <span className="text-muted-foreground">AXA Gulf · Active</span>
              </div>
            </div>
          </section>

          {/* 8. Regulatory Status */}
          <section id="section-8" className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              8. Regulatory Status
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Licenses, registrations, framework per asset, compliance officer.
            </p>
            <div className="space-y-3 text-sm">
              <div className="rounded-lg border border-[oklch(0.9_0.02_285)] p-4">
                <p className="font-medium text-foreground">DFSA Security Token Framework</p>
                <p className="text-muted-foreground">DIFC · Active · VARA registration pending</p>
              </div>
              <p className="text-muted-foreground">
                Regulatory framework per asset: Reg D/Reg S, MiCA, DFSA. Investor restrictions, filing references.
              </p>
            </div>
          </section>

          {/* 9. Advisors & Board */}
          <section id="section-9" className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              9. Advisors & Board
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Board of directors, advisory board, key relationships. Credibility signals.
            </p>
            <p className="text-muted-foreground">
              Board: Full name, title, entity, nationality, bio, LinkedIn, other directorships, KYC, PEP, independent (Y/N). Advisory: expertise, engagement type, compensation. Key relationships: partners, distribution, government liaison.
            </p>
          </section>

          {/* 10. Track Record & Reputation */}
          <section id="section-10" className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              10. Track Record & Reputation
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Issuer statistics and Reputation Score (R). History doesn&apos;t lie.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {[
                ["Assets tokenized", "1"],
                ["Total value", "$12.5M"],
                ["Total investors", "127"],
                ["Avg Trust Score", "89"],
                ["Distributions paid", "$45,200"],
                ["R Score", "0.70"],
              ].map(([label, value]) => (
                <div key={label} className="text-center p-3 rounded-lg bg-[oklch(0.98_0.01_285)]">
                  <p className="text-xs text-muted-foreground uppercase">{label}</p>
                  <p className="font-bold text-foreground">{value}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              R = 1 − (Disputes/TotalAssets) × AdjustmentFactor. Contributing factors: disputes, compliance lapses, slashing, audit completion rate.
            </p>
          </section>

          {/* 11. Linked Assets */}
          <section id="section-11" className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              11. Linked Assets
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              All assets this issuer manages. Quick status overview.
            </p>
            <Link href="/my-assets" className="inline-flex items-center text-primary font-medium hover:underline">
              View My Assets →
            </Link>
          </section>

          {/* 12. Compliance & Monitoring */}
          <section id="section-12" className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              12. Compliance & Monitoring
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Live compliance dashboard. Outstanding actions, per-asset status, alerts, enforcement history.
            </p>
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
              <p className="font-bold text-emerald-800">Fully Compliant</p>
              <p className="text-sm text-muted-foreground">No outstanding actions. Last review: 2026-03-01.</p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Per-asset: re-verification status, audit status, insurance, bonding. Alerts: expiry, anomaly, regulatory change.
            </p>
          </section>

          {/* 13. Documents Vault */}
          <section id="section-13" className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              13. Documents Vault
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Company docs, compliance docs, professional engagement letters. Version-controlled, hash-anchored.
            </p>
            <div className="space-y-2 text-sm">
              {["Certificate of incorporation", "M&A", "Register of directors", "KYB certificate", "Legal engagement", "Valuation report"].map((doc) => (
                <div key={doc} className="flex justify-between items-center py-2 border-b border-[oklch(0.9_0.02_285)]">
                  <span>{doc}</span>
                  <span className="text-muted-foreground text-xs">Anchored · v1</span>
                </div>
              ))}
            </div>
          </section>

          {/* 14. Activity Log */}
          <section id="section-14" className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              14. Activity Log
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Complete audit trail. Every login, upload, asset action, staking, settings change. Filterable, exportable, permanent.
            </p>
            <div className="rounded-lg border border-[oklch(0.9_0.02_285)] p-4 text-sm text-muted-foreground">
              <p>2026-03-13 14:32 · Mohammed Al-Rashid · Login · 192.168.x.x</p>
              <p>2026-03-13 10:15 · Document upload · Valuation report v2</p>
              <p>2026-03-12 16:45 · Asset submitted · Marina Bay Tower</p>
            </div>
          </section>

          {/* Visibility Rules */}
          <section id="visibility-rules" className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              Visibility Rules
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Who sees what. Issuer sees everything; investors see a curated public profile; regulators get full access under formal request.
            </p>
            <div className="space-y-4 text-sm">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
                <p className="font-medium text-foreground">Issuer (full access)</p>
                <p className="text-muted-foreground mt-1">All sections, all fields, all documents, full activity log.</p>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4">
                <p className="font-medium text-foreground">Investor (public profile)</p>
                <p className="text-muted-foreground mt-1">
                  Company name, type, description, website, logo, verification badge, jurisdiction, track record stats, R score, linked assets, board/advisory names, professional services (firm names only), regulatory licenses (type &amp; status). Not: individual KYC, wallet balances, activity logs, internal docs, contact details beyond investor relations.
                </p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
                <p className="font-medium text-foreground">Regulator / Auditor (formal request)</p>
                <p className="text-muted-foreground mt-1">Everything the issuer sees, plus enforcement history and correspondence logs. Provided under legal process.</p>
              </div>
            </div>
          </section>
        </article>

        {/* CTA */}
        <div className="mt-16 rounded-xl border-2 border-primary bg-primary/5 p-8 text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Complete your profile</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Reach 80%+ to go live with assets. Add legal counsel, auditor, regulatory status, and UBO disclosure.
          </p>
          <button
            type="button"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Edit Profile (coming soon)
          </button>
        </div>
      </main>
    </div>
  );
}
