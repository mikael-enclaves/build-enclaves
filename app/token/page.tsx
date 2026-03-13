import Link from "next/link";

const SECTIONS = [
  "What It Is",
  "What It Does",
  "How the Economics Work",
  "The Two-Token Architecture Explained",
  "Quick Summary",
];

export default function TokenPage() {
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
            <Link href="/my-profile" className="hover:text-foreground transition-colors">
              My Profile
            </Link>
            <Link href="/token" className="text-primary font-medium">
              Token
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">The ENCL Token</h1>
        <p className="text-lg text-muted-foreground mb-8">
          What It Is, How It Works, Why It Matters
        </p>

        {/* Table of Contents */}
        <nav className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6 mb-12 shadow-sm">
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">
            Contents
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {SECTIONS.map((s, i) => (
              <li key={i}>
                <a
                  href={`#section-${i + 1}`}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {i + 1}. {s}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="space-y-12">
          {/* 1. What It Is */}
          <section
            id="section-1"
            className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6"
          >
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              1. What It Is
            </h2>
            <p className="text-muted-foreground mb-4">
              ENCL is the utility token that powers the Enclaves network. It is not an asset token — it
              does not represent ownership of any real-world asset. Instead, it is the work, stake, and
              coordination token that makes the entire trust infrastructure function.
            </p>
            <p className="text-muted-foreground mb-4">
              Enclaves uses a two-token architecture on purpose. Asset tokens (ERC-1155) represent
              ownership of real-world assets. ENCL is the separate utility token that secures the
              network, gates issuance, pays for services, and governs protocol rules. These two are
              deliberately kept apart so that asset truth is determined by law, process, and
              verification — never by token votes or governance attacks.
            </p>
            <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4 mt-4">
              <p className="font-medium text-foreground">
                Think of it this way: asset tokens are the property deed. ENCL is the deposit, the
                licence fee, and the operating fuel that keeps the system honest.
              </p>
            </div>
          </section>

          {/* 2. What It Does */}
          <section
            id="section-2"
            className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6"
          >
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              2. What It Does
            </h2>
            <p className="text-muted-foreground mb-8">
              ENCL has five core functions. Each one creates real demand tied to actual usage — not
              speculation.
            </p>

            <div className="space-y-8">
              {/* 2.1 Economic Bonding */}
              <div className="rounded-lg border border-[oklch(0.9_0.02_285)] p-5">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  2.1 Economic Bonding (Mandatory Staking)
                </h3>
                <p className="text-muted-foreground mb-4">
                  Every SPV operator must stake ENCL tokens to operate. This stake is a bond of
                  accountability — real money at risk that can be taken away if the operator
                  misbehaves.
                </p>
                <div className="mb-4">
                  <p className="font-medium text-foreground mb-2">How it works:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                    <li>You lock ENCL tokens proportional to the value of assets you&apos;re managing</li>
                    <li>Higher-risk assets (weaker trust classes) require larger stakes</li>
                    <li>Class I assets need 1–2% bonded, Class V needs 12–20%</li>
                    <li>
                      If you commit fraud, fail audits, or breach obligations, your stake gets slashed
                    </li>
                    <li>If you operate honestly, your stake remains locked and earns protocol rewards</li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  <strong className="text-foreground">Why it matters:</strong> This is what makes
                  Enclaves different from &quot;upload a PDF and mint tokens&quot; platforms. Every
                  issuer has real capital at risk. Misconduct has immediate financial consequences.
                  The stake is publicly visible — investors can see exactly how much skin the issuer
                  has in the game.
                </p>
              </div>

              {/* 2.2 Issuance Capacity */}
              <div className="rounded-lg border border-[oklch(0.9_0.02_285)] p-5">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  2.2 Issuance Capacity (Rate-Limiting)
                </h3>
                <p className="text-muted-foreground mb-4">
                  You can&apos;t tokenize unlimited assets. To issue tokens for a new asset, you must
                  lock ENCL tokens to gain issuance capacity.
                </p>
                <div className="mb-4">
                  <p className="font-medium text-foreground mb-2">How it works:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                    <li>The amount you lock determines how much total value you can tokenize</li>
                    <li>Want to tokenize $10M in assets? You need to lock enough ENCL to cover that capacity</li>
                    <li>This is separate from the staking bond — it&apos;s an additional lock</li>
                    <li>When assets are exited or wound down, capacity is released</li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  <strong className="text-foreground">Why it matters:</strong> This prevents anyone
                  from flooding the system with low-quality assets. Issuance capacity is economically
                  constrained — you have to commit real resources to participate. It mirrors how gas
                  limits constrain execution on blockchains, but for trust creation.
                </p>
              </div>

              {/* 2.3 Infrastructure Payments */}
              <div className="rounded-lg border border-[oklch(0.9_0.02_285)] p-5">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  2.3 Infrastructure Payments (Service Fees)
                </h3>
                <p className="text-muted-foreground mb-4">
                  Every service the Enclaves platform provides is paid for in ENCL tokens.
                </p>
                <div className="mb-4">
                  <p className="font-medium text-foreground mb-2">What you pay for:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                    <li>Asset registration</li>
                    <li>Verification and attestation processing</li>
                    <li>Proof-of-ownership generation</li>
                    <li>Transfer synchronization (on-chain ↔ off-chain ownership updates)</li>
                    <li>Compliance workflow automation</li>
                    <li>Monitoring and anomaly detection</li>
                    <li>Trust Certificate generation and updates</li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  <strong className="text-foreground">Why it matters:</strong> These are not optional
                  fees — they represent real resources consumed: legal automation, AI monitoring,
                  cryptographic attestations, and operational enforcement. This ties token demand
                  directly to actual system usage rather than speculative activity. More assets on the
                  platform = more service fees = more demand for ENCL.
                </p>
              </div>

              {/* 2.4 Operator Rewards */}
              <div className="rounded-lg border border-[oklch(0.9_0.02_285)] p-5">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  2.4 Operator Rewards (Earning ENCL)
                </h3>
                <p className="text-muted-foreground mb-4">
                  People who run parts of the Enclaves infrastructure earn ENCL tokens for doing it
                  well.
                </p>
                <div className="mb-4">
                  <p className="font-medium text-foreground mb-2">Who earns:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                    <li>Verification service operators</li>
                    <li>Monitoring agent operators</li>
                    <li>Process automation runners</li>
                    <li>Compliance workflow maintainers</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="font-medium text-foreground mb-2">How rewards work:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                    <li>Rewards tied to objective metrics: uptime, accuracy, speed, dispute resolution quality</li>
                    <li>Good performance = more rewards. Poor performance = fewer rewards + potential slashing</li>
                    <li>Creates a decentralised network of operators economically incentivised to maintain integrity</li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  <strong className="text-foreground">Why it matters:</strong> The trust infrastructure
                  doesn&apos;t run itself. Someone has to verify assets, monitor compliance, and
                  process attestations. ENCL rewards turn trust maintenance into an economically
                  rational activity — operators get paid to keep things honest.
                </p>
              </div>

              {/* 2.5 Protocol Governance */}
              <div className="rounded-lg border border-[oklch(0.9_0.02_285)] p-5">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  2.5 Protocol Governance (Limited and Focused)
                </h3>
                <p className="text-muted-foreground mb-4">
                  ENCL holders can vote on protocol-level parameters. This governance is deliberately
                  narrow — it covers how the system works, never what the assets are worth.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
                    <p className="font-medium text-foreground mb-2">What governance controls:</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                      <li>Staking thresholds (bond required per trust class)</li>
                      <li>Slashing rules</li>
                      <li>Supported jurisdictions</li>
                      <li>Onboarding requirements for SPV operators</li>
                      <li>Standards for new asset classes</li>
                      <li>Fee structures</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
                    <p className="font-medium text-foreground mb-2">What governance does NOT control:</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                      <li>Individual asset values or prices</li>
                      <li>SPV decisions about specific assets</li>
                      <li>Dispute outcomes</li>
                      <li>Trust Scores (computed from objective data, not voted on)</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  <strong className="text-foreground">Why the limitation:</strong> If governance could
                  influence asset truth, a 51% token holder could manipulate asset values. By
                  limiting governance to protocol parameters, Enclaves ensures that the rules of the
                  game can evolve, but the game itself is always played honestly.
                </p>
              </div>
            </div>
          </section>

          {/* 3. How the Economics Work */}
          <section
            id="section-3"
            className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6"
          >
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              3. How the Economics Work
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Supply</h3>
                <p className="text-muted-foreground mb-4">
                  Fixed total supply. No inflation. No additional minting. What exists at launch is
                  all that will ever exist.
                </p>
                <p className="text-muted-foreground">
                  As the network grows, more tokens get locked in staking and issuance capacity. This
                  naturally reduces circulating supply while demand for services increases. The
                  economics are designed so that growth in real usage — not hype — drives token value.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Allocation</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">35%</strong> — Ecosystem & Community: operator rewards, community incentives, grants</li>
                  <li><strong className="text-foreground">20%</strong> — Team & Advisors: multi-year vesting with cliff periods</li>
                  <li><strong className="text-foreground">20%</strong> — Treasury & Reserve: long-term sustainability, partnerships</li>
                  <li><strong className="text-foreground">15%</strong> — Early Backers: seed and strategic investors with lock-ups</li>
                  <li><strong className="text-foreground">10%</strong> — Public Distribution: public sale and liquidity provision</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">What Drives Demand</h3>
                <p className="text-muted-foreground mb-4">
                  Every major function requires ENCL. Demand comes from four compounding sources:
                </p>
                <ol className="list-decimal list-inside text-muted-foreground space-y-2 mb-4">
                  <li><strong className="text-foreground">SPV operations</strong> — every active SPV must maintain a stake. More SPVs = more tokens locked.</li>
                  <li><strong className="text-foreground">Asset issuance</strong> — every new tokenization requires capacity locks. More assets = more tokens locked.</li>
                  <li><strong className="text-foreground">Service fees</strong> — verification, attestation, compliance, transfers all cost ENCL. More transactions = more tokens consumed.</li>
                  <li><strong className="text-foreground">Network growth</strong> — more jurisdictions, asset classes, and participants compound all of the above.</li>
                </ol>
                <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
                  <p className="font-medium text-foreground">
                    The key insight: ENCL demand is a function of real economic activity on the
                    platform, not market sentiment. If nobody is tokenizing assets, there&apos;s no
                    demand. If the platform is processing billions in verified RWAs, demand is
                    structurally embedded.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Two-Token Architecture */}
          <section
            id="section-4"
            className="scroll-mt-24 rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6"
          >
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              4. The Two-Token Architecture Explained
            </h2>
            <p className="text-muted-foreground mb-6">
              Why not just use one token for everything?
            </p>
            <p className="text-muted-foreground mb-6">
              Because it creates a circular trust problem. If the same token that represents asset
              ownership also controls governance, then someone with enough governance tokens could
              vote to change the rules in their favour — manipulate asset values, override verification
              requirements, or reduce staking bonds. Asset truth would be at the mercy of
              token-weighted votes.
            </p>
            <p className="text-muted-foreground mb-6">
              Enclaves solves this by separating the two:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                <h3 className="font-bold text-foreground mb-3">Asset Tokens (ERC-1155)</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Represent ownership of specific real-world assets</li>
                  <li>One token ID per asset, immutable supply</li>
                  <li>Legally bound to SPV-held assets</li>
                  <li>Value derived from the underlying asset</li>
                  <li>Transferable on secondary markets</li>
                </ul>
              </div>
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                <h3 className="font-bold text-foreground mb-3">ENCL (Utility Token)</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Powers the network infrastructure</li>
                  <li>Used for staking, capacity, payments, rewards, governance</li>
                  <li>Value derived from usage, not asset ownership</li>
                  <li>Cannot influence individual asset outcomes</li>
                  <li>Governs protocol rules only</li>
                </ul>
              </div>
            </div>
            <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4 mt-6">
              <p className="font-medium text-foreground">
                This separation means: asset truth is always determined by law, verification, and
                process. Never by votes. Never by who holds the most tokens.
              </p>
            </div>
          </section>

          {/* 5. Quick Summary */}
          <section
            id="section-5"
            className="scroll-mt-24 rounded-xl border-2 border-primary/30 bg-primary/5 p-6"
          >
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-primary" />
              5. Quick Summary
            </h2>
            <div className="space-y-4 text-sm">
              <p>
                <strong className="text-foreground">What ENCL is:</strong>{" "}
                <span className="text-muted-foreground">
                  The utility token that secures, powers, and governs the Enclaves trust infrastructure.
                </span>
              </p>
              <p>
                <strong className="text-foreground">What ENCL is not:</strong>{" "}
                <span className="text-muted-foreground">
                  An ownership claim on any real-world asset. Not a revenue-share security. Not a
                  passive income token.
                </span>
              </p>
              <p>
                <strong className="text-foreground">Five functions:</strong>{" "}
                <span className="text-muted-foreground">
                  Staking bonds, issuance capacity, service payments, operator rewards, protocol
                  governance.
                </span>
              </p>
              <p>
                <strong className="text-foreground">Economic model:</strong>{" "}
                <span className="text-muted-foreground">
                  Fixed supply, demand driven by real usage, tokens locked in staking reduce
                  circulating supply as network grows.
                </span>
              </p>
              <p>
                <strong className="text-foreground">Why two tokens:</strong>{" "}
                <span className="text-muted-foreground">
                  Asset truth must never depend on votes. Separating asset tokens from the utility
                  token prevents governance attacks on asset integrity.
                </span>
              </p>
              <div className="mt-6 pt-6 border-t border-primary/20">
                <p className="font-medium text-foreground mb-3">Who needs ENCL:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-muted-foreground">
                  <li>• Issuers — to stake bonds and gain issuance capacity</li>
                  <li>• SPV operators — to maintain operational bonds</li>
                  <li>• Verifiers — to stake collateral for attestations</li>
                  <li>• Service consumers — to pay for platform services</li>
                  <li>• Governance participants — to vote on protocol parameters</li>
                  <li>• Infrastructure operators — to earn rewards</li>
                </ul>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
