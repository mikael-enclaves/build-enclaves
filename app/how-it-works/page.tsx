import Link from "next/link";
import { Nav } from "@/components/Nav";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.96_0.01_285)]">
      <Nav active="How It Works" logoHref="/home" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        {/* Hero */}
        <header className="mb-16">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Tokenize Your Asset on Enclaves
          </h1>
          <p className="text-xl text-muted-foreground font-medium mb-6">
            The Complete Guide for Issuers
          </p>
          <p className="text-muted-foreground">
            Everything you need to know, understand, and do — from &quot;I have an asset&quot; to &quot;it&apos;s live and trading.&quot;
          </p>
        </header>

        {/* Table of Contents */}
        <nav className="mb-16 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">
            Contents
          </h2>
          <ol className="space-y-2 text-sm">
            {[
              "Before You Start",
              "Step 1: Understand What You're Building",
              "Step 2: Know Your Trust Class",
              "Step 3: Choose Your Jurisdiction",
              "Step 4: Prepare Your Documentation",
              "Step 5: Form Your SPV",
              "Step 6: Complete Verification",
              "Step 7: Stake Your Bond",
              "Step 8: Design Your Token",
              "Step 9: Set Up Compliance and Monitoring",
              "Step 10: Launch and Manage",
              "Quick Reference",
              "Timeline Expectations",
              "Costs to Expect",
              "FAQ",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href={`#section-${i + 1}`}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Content Sections */}
        <article className="space-y-16 prose prose-slate max-w-none prose-headings:scroll-mt-24">
          {/* Before You Start */}
          <section id="section-1" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-1 h-8 rounded-full bg-primary" />
              Before You Start
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Enclaves is not a marketplace where you list an asset and hope someone buys it. It&apos;s a trust infrastructure that legally binds your real-world asset to an on-chain token — with verification, economic bonding, and continuous monitoring. The result is a token that represents genuine ownership, not just a claim.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This guide walks you through the entire process. Read it once to understand how it works, then use it as a checklist when you&apos;re ready to begin.
            </p>
          </section>

          {/* Step 1 */}
          <section id="section-2" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded bg-primary text-primary-foreground text-sm font-bold">
                1
              </span>
              Understand What You&apos;re Building
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              When you tokenize an asset on Enclaves, you are creating a legally enforceable, economically bonded, and cryptographically verifiable representation of a real-world asset on the blockchain. Here&apos;s what that means in practice:
            </p>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <strong className="text-foreground">A Special Purpose Vehicle (SPV)</strong> — a separate legal entity — will be formed in a recognized jurisdiction. This SPV holds your asset in trust for token holders. It is bankruptcy-remote, meaning if your company fails, the asset is protected. Token holders are recognized as beneficial owners.
              </li>
              <li>
                <strong className="text-foreground">An ERC-1155 token</strong> is minted on-chain that maps to your asset. ERC-1155 supports both single-unit assets (one painting = one token) and fractional ownership (one building = 100,000 tokens). The supply is immutably set at issuance and cannot be changed.
              </li>
              <li>
                <strong className="text-foreground">A Trust Score</strong> is calculated and published (0–100). It is transparent, reproducible, and based on five measurable dimensions. Investors use it to assess risk.
              </li>
              <li>
                <strong className="text-foreground">You will need to stake ENCL tokens</strong> as an economic bond. This bond can be slashed if you misrepresent the asset, fail audits, or breach your obligations. Fraud becomes expensive rather than free.
              </li>
            </ul>
          </section>

          {/* Step 2: Trust Classes */}
          <section id="section-3" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded bg-primary text-primary-foreground text-sm font-bold">
                2
              </span>
              Know Your Trust Class
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Before anything else, you need to understand which Trust Class your asset falls into. This determines your verification requirements, staking bond, and base trust score. Trust Classes are about <strong className="text-foreground">how strongly ownership can be independently verified</strong>, not what your asset is.
            </p>
            <div className="space-y-6">
              {[
                {
                  class: "Class I — Sovereign Registry Anchored",
                  bond: "1–2%",
                  desc: "Ownership recorded in a government-operated public registry. Anyone can independently verify without relying on you. Examples: Real estate (Dubai Land Department, Singapore Land Authority), government securities, public share registry.",
                },
                {
                  class: "Class II — Regulated Custodian Anchored",
                  bond: "3–5%",
                  desc: "A regulated custodian holds the asset and can confirm ownership. Licensed, insured, subject to oversight. Examples: Gold in Brinks vault, equities at regulated broker.",
                },
                {
                  class: "Class III — Dual-Professional Verified",
                  bond: "6–8%",
                  desc: "No registry or custodian — ownership validated by two or more independent professionals. Examples: Private company shares, revenue participation, private loans, carbon credits.",
                },
                {
                  class: "Class IV — Physical Authentication Anchored",
                  bond: "8–12%",
                  desc: "Ownership depends on physical possession and expert authentication. Examples: Fine art, luxury watches, collectibles, wine in bonded warehouses.",
                },
                {
                  class: "Class V — Contractual Claim Anchored",
                  bond: "12–20%",
                  desc: "Tokenizing a contractual right, not a tangible asset. No registry, no physical item. Trust depends on contract enforceability and counterparty credit. Examples: Revenue shares, future receivables, litigation finance, music royalties.",
                },
                {
                  class: "Class VI — Oracle / Algorithmically Anchored",
                  bond: "20–30%",
                  desc: "Value depends on external data feeds. Weakest anchor. Examples: Commodity index derivatives, synthetic asset representations.",
                },
              ].map((tc) => (
                <div
                  key={tc.class}
                  className="rounded-lg border border-[oklch(0.9_0.02_285)] bg-white p-5"
                >
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="font-bold text-foreground">{tc.class}</h3>
                    <span className="text-sm font-medium text-primary shrink-0">
                      Bond: {tc.bond}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tc.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-lg border-l-4 border-primary bg-primary/5">
              <p className="text-sm font-medium text-foreground mb-1">How to determine your class</p>
              <p className="text-sm text-muted-foreground">
                &quot;Can someone verify I own this without asking me?&quot; Registry says yes → Class I. Regulated custodian says yes → Class II. Two professionals confirm → Class III. Experts authenticate physical item → Class IV. Purely contractual → Class V. Data feeds → Class VI.
              </p>
            </div>
          </section>

          {/* Step 3: Jurisdiction */}
          <section id="section-4" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded bg-primary text-primary-foreground text-sm font-bold">
                3
              </span>
              Choose Your Jurisdiction
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Your SPV must be formed in a supported jurisdiction. Each has a Jurisdiction Strength Index (J) based on rule of law, contract enforceability, and dispute resolution. Consider: where is the asset located? Where are investors? Which framework fits? Tax treatment? Registry access (critical for Class I)?
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[oklch(0.9_0.02_285)]">
                    <th className="text-left py-3 font-medium text-foreground">Jurisdiction</th>
                    <th className="text-left py-3 font-medium text-foreground">J Score</th>
                    <th className="text-left py-3 font-medium text-foreground">Best For</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    ["DIFC (Dubai)", "0.85", "Real estate, Middle East assets, DLD integration"],
                    ["ADGM (Abu Dhabi)", "0.83", "Financial instruments, fund structures"],
                    ["Singapore", "0.92", "Financial securities, precious metals, trade finance"],
                    ["Switzerland", "0.90", "Commodities, corporate bonds, SIX Digital Exchange"],
                    ["Delaware (US)", "0.88", "US-facing, Reg D/Reg S, institutional investors"],
                    ["United Kingdom", "0.87", "Financial instruments, art, Digital Securities Sandbox"],
                    ["Cayman Islands", "0.78", "Fund structures, PE/VC token structures"],
                    ["Hong Kong", "0.84", "Asia-Pacific assets, equities"],
                  ].map(([jur, j, best]) => (
                    <tr key={jur} className="border-b border-[oklch(0.9_0.02_285)]">
                      <td className="py-3 font-medium text-foreground">{jur}</td>
                      <td className="py-3">{j}</td>
                      <td className="py-3">{best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Step 4: Documentation */}
          <section id="section-5" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded bg-primary text-primary-foreground text-sm font-bold">
                4
              </span>
              Prepare Your Documentation
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              What you need depends on your Trust Class. Documents are hashed and anchored on-chain — tampering is detectable. Documents stored off-chain; integrity provable on-chain forever.
            </p>
            <div className="space-y-4">
              <div className="rounded-lg border border-[oklch(0.9_0.02_285)] bg-white p-5">
                <h4 className="font-bold text-foreground mb-2">Every issuer must provide</h4>
                <p className="text-sm text-muted-foreground">
                  KYC/KYB verification, certificate of incorporation, proof of authority, asset description, valuation report, proof of ownership, encumbrance disclosure.
                </p>
              </div>
              {[
                ["Class I adds", "Registry extract, reference number, licensed verifier, encumbrance search"],
                ["Class II adds", "Custodian confirmation, insurance, physical/ledger audit, regulatory license"],
                ["Class III adds", "Legal opinion, auditor confirmation, counterparty acknowledgement"],
                ["Class IV adds", "Authentication certificate, custody confirmation, insurance, inspection schedule"],
                ["Class V adds", "Dual legal review, credit assessment, enforceability opinion, frequent monitoring"],
                ["Class VI adds", "Oracle audit, data source verification, smart contract audit, continuous monitoring"],
              ].map(([label, items]) => (
                <div key={label} className="rounded-lg border border-[oklch(0.9_0.02_285)] bg-white p-5">
                  <h4 className="font-bold text-foreground mb-1">{label}</h4>
                  <p className="text-sm text-muted-foreground">{items}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Steps 5-10 condensed */}
          <section id="section-6" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-1 h-8 rounded-full bg-primary" />
              Steps 5–10 Summary
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-foreground mb-2">Step 5: Form Your SPV</h3>
                <p className="text-sm text-muted-foreground">
                  SPV holds the asset for token holders, is bankruptcy-remote, operates under standard governance. L = J × S (jurisdiction strength × SPV completeness). Work with legal counsel to incorporate, transfer asset, execute trust agreement, anchor document hash on-chain.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Step 6: Complete Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Independent third parties verify — no self-attestation. V = 1 − Π(1 − vᵢ). Each additional independent source increases score nonlinearly. Verifiers assigned by Trust Class; verification events timestamped and recorded immutably.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Step 7: Stake Your Bond</h3>
                <p className="text-sm text-muted-foreground">
                  RequiredStake = α(Class) × AssetValue. Class I: 1–2%, II: 3–5%, III: 6–8%, IV: 8–12%, V: 12–20%, VI: 20–30%. E = min(1, YourStake / RequiredStake). Stake can be slashed for breach; mechanism is public.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Step 8: Design Your Token</h3>
                <p className="text-sm text-muted-foreground">
                  Token supply, min investment, blockchain, transfer restrictions, secondary market, distribution schedule. Mint Authorization: all must be true — verification complete, SPV active, no encumbrances, bond staked, cooling done. Enforced by smart contracts.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Step 9: Compliance and Monitoring</h3>
                <p className="text-sm text-muted-foreground">
                  Regulatory framework (Reg D/S, MiCA, DFSA), monitoring level (AI agent, anomaly detection, manual), audit schedule, re-verification. P = exp(−λΔt) × C — trust decays without re-verification. Anomalies can freeze issuance and restrict transfers.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Step 10: Launch and Manage</h3>
                <p className="text-sm text-muted-foreground">
                  Trust Certificate published: Trust Class, Score, jurisdiction, verifications, stake, insurance, encumbrance, reputation, re-verification date. T = 0.25L + 0.30V + 0.20E + 0.15P + 0.10R. Ongoing: SPV compliance, insurance, re-verifications, monitoring, income distribution.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Reference */}
          <section id="section-11" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-1 h-8 rounded-full bg-primary" />
              Quick Reference: What You Need by Trust Class
            </h2>
            <p className="text-muted-foreground mb-4">
              Every issuer needs: KYC/KYB, entity documents, asset description, valuation report, proof of ownership, encumbrance disclosure, ENCL stake, compliance framework, monitoring setup.
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Class I adds: Registry extract, reference number, licensed verifier, encumbrance search</li>
              <li>Class II adds: Custodian confirmation, insurance, physical/ledger audit, regulatory license</li>
              <li>Class III adds: Legal opinion, auditor confirmation, counterparty acknowledgement</li>
              <li>Class IV adds: Authentication certificate, custody confirmation, insurance, inspection schedule</li>
              <li>Class V adds: Dual legal review, credit assessment, enforceability opinion, frequent monitoring</li>
              <li>Class VI adds: Oracle audit, data source verification, smart contract audit, continuous monitoring</li>
            </ul>
          </section>

          {/* Timeline */}
          <section id="section-12" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-1 h-8 rounded-full bg-primary" />
              Timeline Expectations
            </h2>
            <p className="text-muted-foreground mb-4">
              Steps 1–3: 1–2 weeks · Step 4: 2–6 weeks · Step 5: 2–4 weeks · Step 6: 1–4 weeks · Steps 7–8: 1 week · Step 9: 1 week · Step 10: Same day once conditions met.
            </p>
            <p className="text-sm font-medium text-foreground">
              Total: 6–16 weeks from start to live tokens. Class I typically faster; Class V longer due to deeper verification.
            </p>
          </section>

          {/* Costs */}
          <section id="section-13" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-1 h-8 rounded-full bg-primary" />
              Costs to Expect
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>SPV formation: $2,000–$15,000</li>
              <li>Legal counsel: $5,000–$50,000+</li>
              <li>Valuation report: $1,000–$10,000</li>
              <li>Verification fees: Depends on Trust Class</li>
              <li>ENCL stake: 1–30% of asset value (returned if no misconduct)</li>
              <li>Platform fees: Protocol-defined, in ENCL</li>
              <li>Ongoing: Audit, insurance, re-verification, monitoring</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground italic">
              The staking bond is not a cost — it&apos;s capital at risk that you get back. Think of it as a security deposit.
            </p>
          </section>

          {/* FAQ */}
          <section id="section-14" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-1 h-8 rounded-full bg-primary" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Can I tokenize an asset I don't fully own?",
                  a: "No. The SPV must hold clear, unencumbered ownership (or properly disclosed encumbrances). Partial ownership must be disclosed and structured accordingly.",
                },
                {
                  q: "What happens if my asset decreases in value?",
                  a: "The token represents ownership, not a guaranteed price. Market value changes are normal. Significant drops may trigger re-verification and Trust Score adjustment.",
                },
                {
                  q: "Can I unstake my bond?",
                  a: "Not while tokens are outstanding. Bond remains locked for the life of the token. If all tokens are burned or bought back, you can request unstaking subject to a cooling period.",
                },
                {
                  q: "What if I want to sell the underlying asset?",
                  a: "Triggers the exit process. Token holders receive proceeds proportionally. The SPV handles sale, distribution, and wind-down.",
                },
                {
                  q: "Who controls the SPV?",
                  a: "SPV operates under Enclaves governance standards. You or an approved operator manage day-to-day; key decisions require protocol adherence and, where applicable, token holder approval.",
                },
                {
                  q: "What jurisdictions can my investors be from?",
                  a: "Depends on your regulatory framework. Reg D: US accredited. Reg S: non-US. MiCA: EU. DFSA: DIFC. Multi-jurisdiction structures cover broader audiences but need more legal work.",
                },
                {
                  q: "Is this a security?",
                  a: "In most jurisdictions, yes — tokenized RWAs with income rights and appreciation potential are securities. Enclaves operates within securities frameworks.",
                },
              ].map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-lg border border-[oklch(0.9_0.02_285)] bg-white overflow-hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-2 p-4 font-medium text-foreground [&::-webkit-details-marker]:hidden">
                    <span className="text-primary group-open:rotate-90 transition-transform">›</span>
                    {faq.q}
                  </summary>
                  <div className="px-4 pb-4 pl-8">
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        </article>

        {/* CTA */}
        <div className="mt-16 rounded-xl border-2 border-primary bg-primary/5 p-8 text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Ready to tokenize?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Start the onboarding flow and we&apos;ll guide you through each step with the information we need.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Begin Onboarding
          </Link>
        </div>
      </main>
    </div>
  );
}
