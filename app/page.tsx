"use client";

import { useState, useRef } from "react";

const STEPS = [
  { id: 1, title: "Your Details" },
  { id: 2, title: "Your Project" },
  { id: 3, title: "Asset Details" },
  { id: 4, title: "Legal & SPV" },
  { id: 5, title: "Trust Class" },
  { id: 6, title: "Verification" },
  { id: 7, title: "Token Design" },
  { id: 8, title: "Bonding" },
  { id: 9, title: "Compliance" },
  { id: 10, title: "Review" },
];

const TRUST_METRICS = [
  { key: "L", value: 0 },
  { key: "V", value: 0 },
  { key: "E", value: 0 },
  { key: "P", value: 0 },
  { key: "R", value: 50 },
];

type FormData = {
  // Step 1
  fullName: string;
  email: string;
  companyName: string;
  entityType: string;
  businessAddress: string;
  phone: string;
  kycMethod: string;
  idDocument: File | null;
  certificateOfIncorporation: File | null;
  // Step 2
  projectName: string;
  description: string;
  assetType: string;
  assetValue: string;
  fundingTarget: string;
  targetInvestors: string;
  holdingPeriod: string;
  exitStrategy: string;
  // Step 3
  assetName: string;
  detailedDescription: string;
  valuationProvider: string;
  valuationDate: string;
  encumbrances: string;
  proofOfOwnership: File | null;
  valuationReport: File | null;
  insurance: File | null;
  // Step 4
  jurisdiction: string;
  spvName: string;
  structure: string;
  legalCounsel: string;
  docHash: string;
  spvDocs: File | null;
  legalOpinion: File | null;
  // Step 5
  trustClass: string;
  // Step 6
  primaryVerifier: string;
  primaryConfidence: string;
  secondaryVerifier: string;
  secondaryConfidence: string;
  custodianConfirmation: boolean;
  insuranceVerified: boolean;
  verificationCert: File | null;
  encumbranceSearch: File | null;
  // Step 7
  tokenStandard: string;
  blockchain: string;
  totalSupply: string;
  pricePerToken: string;
  minInvestment: string;
  transfers: string;
  secondaryMkt: string;
  verificationComplete: boolean;
  spvActive: boolean;
  noEncumbrances: boolean;
  stakeBonded: boolean;
  coolingDone: boolean;
  // Step 8
  bondClass: string;
  yourStake: string;
  // Step 9
  regulatoryFramework: string;
  monitoring: string;
  auditSchedule: string;
  reVerification: string;
  reputation: string;
  daysSinceLastVerification: string;
};

const REGULATORY_FRAMEWORK_OPTIONS = ["DIFC", "ADGM", "SEC Reg D", "MiFID II", "Other"];
const MONITORING_OPTIONS = ["Real-time", "Daily", "Weekly", "Monthly", "On-demand"];
const AUDIT_SCHEDULE_OPTIONS = ["Quarterly", "Semi-annual", "Annual", "Ad-hoc"];
const RE_VERIFICATION_OPTIONS = ["30 days", "90 days", "180 days", "365 days"];
const REPUTATION_OPTIONS = ["New (0.5)", "Established (0.7)", "Trusted (0.9)", "Verified (1.0)"];

const BOND_CLASSES = [
  { id: "I", label: "I", range: "1-2%", pct: 0.015 },
  { id: "II", label: "II", range: "3-5%", pct: 0.04 },
  { id: "III", label: "III", range: "6-8%", pct: 0.07 },
  { id: "IV", label: "IV", range: "8-12%", pct: 0.1 },
  { id: "V", label: "V", range: "12-20%", pct: 0.16 },
  { id: "VI", label: "VI", range: "20-30%", pct: 0.25 },
];

const ENTITY_TYPES = ["Limited Company", "LLC", "Investment Fund", "Individual"];
const KYC_METHODS = ["Sumsub", "Persona", "Onfido", "Manual Review"];
const ASSET_TYPES = ["Real Estate", "Commodities", "Receivables", "Securities", "Infrastructure", "Other"];
const TARGET_INVESTORS = ["Retail", "Accredited", "Institutional", "Mixed"];
const HOLDING_PERIODS = ["6 months", "1 year", "3 years", "5 years", "10 years", "Open-ended"];
const EXIT_STRATEGIES = ["Secondary sale", "Redemption", "IPO", "Liquidation", "Other"];
const ENCUMBRANCES_OPTIONS = ["None", "Mortgage", "Lien", "Other"];
const STRUCTURE_OPTIONS = ["Limited Company", "LLP", "Trust", "Foundation", "Other"];
const JURISDICTIONS = [
  { id: "difc", name: "DIFC (Dubai)", score: "J=0.85", flag: "🇦🇪" },
  { id: "adgm", name: "ADGM (Abu Dhabi)", score: "J=0.83", flag: "🇦🇪" },
  { id: "singapore", name: "Singapore", score: "J=0.92", flag: "🇸🇬" },
  { id: "switzerland", name: "Switzerland", score: "J=0.9", flag: "🇨🇭" },
  { id: "cayman", name: "Cayman Islands", score: "J=0.78", flag: "🇰🇾" },
  { id: "delaware", name: "Delaware (US)", score: "J=0.88", flag: "🇺🇸" },
  { id: "uk", name: "United Kingdom", score: "J=0.87", flag: "🇬🇧" },
  { id: "hongkong", name: "Hong Kong", score: "J=0.84", flag: "🇭🇰" },
];
const CONFIDENCE_OPTIONS = ["50%", "70%", "85%", "95%", "100%"];
const TOKEN_STANDARD_OPTIONS = ["ERC-20", "ERC-3643", "ERC-1400", "Other"];
const BLOCKCHAIN_OPTIONS = ["Ethereum", "Polygon", "Base", "Arbitrum", "Other"];
const TRANSFERS_OPTIONS = ["Unrestricted", "Restricted", "KYC-gated", "Lock period"];
const SECONDARY_MKT_OPTIONS = ["Enabled", "Disabled", "Approved buyers only"];
const TRUST_CLASSES = [
  { id: "class-i", name: "Class I: Sovereign Registry", desc: "Government registries that publicly record ownership.", bond: "1-2%", risk: "1/6", color: "emerald" },
  { id: "class-ii", name: "Class II: Regulated Custodian", desc: "Regulated custodian with enforceable records.", bond: "3-5%", risk: "2/6", color: "blue" },
  { id: "class-iii", name: "Class III: Dual-Professional", desc: "Validated through independent professional review.", bond: "6-8%", risk: "3/6", color: "violet" },
  { id: "class-iv", name: "Class IV: Physical Authentication", desc: "Physical possession and expert authentication.", bond: "8-12%", risk: "4/6", color: "orange" },
  { id: "class-v", name: "Class V: Contractual Claim", desc: "Contractual right — no registry, no physical asset.", bond: "12-20%", risk: "5/6", color: "red" },
  { id: "class-vi", name: "Class VI: Oracle / Algorithmic", desc: "Value depends on external data feeds.", bond: "20-30%", risk: "6/6", color: "neutral" },
];

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    companyName: "",
    entityType: "",
    businessAddress: "",
    phone: "",
    kycMethod: "",
    idDocument: null,
    certificateOfIncorporation: null,
    projectName: "",
    description: "",
    assetType: "",
    assetValue: "",
    fundingTarget: "",
    targetInvestors: "",
    holdingPeriod: "",
    exitStrategy: "",
    assetName: "",
    detailedDescription: "",
    valuationProvider: "",
    valuationDate: "",
    encumbrances: "",
    proofOfOwnership: null,
    valuationReport: null,
    insurance: null,
    jurisdiction: "",
    spvName: "",
    structure: "",
    legalCounsel: "",
    docHash: "",
    spvDocs: null,
    legalOpinion: null,
    trustClass: "",
    primaryVerifier: "",
    primaryConfidence: "",
    secondaryVerifier: "",
    secondaryConfidence: "",
    custodianConfirmation: false,
    insuranceVerified: false,
    verificationCert: null,
    encumbranceSearch: null,
    tokenStandard: "",
    blockchain: "",
    totalSupply: "100000",
    pricePerToken: "100",
    minInvestment: "1000",
    transfers: "",
    secondaryMkt: "",
    verificationComplete: false,
    spvActive: false,
    noEncumbrances: false,
    stakeBonded: false,
    coolingDone: false,
    bondClass: "",
    yourStake: "0",
    regulatoryFramework: "",
    monitoring: "",
    auditSchedule: "",
    reVerification: "",
    reputation: "New (0.5)",
    daysSinceLastVerification: "0",
  });
  const idFileRef = useRef<HTMLInputElement>(null);
  const certFileRef = useRef<HTMLInputElement>(null);
  const proofOfOwnershipRef = useRef<HTMLInputElement>(null);
  const valuationReportRef = useRef<HTMLInputElement>(null);
  const insuranceRef = useRef<HTMLInputElement>(null);
  const spvDocsRef = useRef<HTMLInputElement>(null);
  const legalOpinionRef = useRef<HTMLInputElement>(null);
  const verificationCertRef = useRef<HTMLInputElement>(null);
  const encumbranceSearchRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof FormData, value: string | File | null | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (
    field: "idDocument" | "certificateOfIncorporation" | "proofOfOwnership" | "valuationReport" | "insurance" | "spvDocs" | "legalOpinion" | "verificationCert" | "encumbranceSearch",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) updateField(field, file);
  };

  const canProceed = () => {
    if (step === 1) {
      return (
        formData.fullName &&
        formData.email &&
        formData.companyName &&
        formData.entityType &&
        formData.businessAddress &&
        formData.phone &&
        formData.kycMethod
      );
    }
    if (step === 2) {
      return (
        formData.projectName &&
        formData.assetType &&
        formData.assetValue &&
        formData.fundingTarget &&
        formData.targetInvestors &&
        formData.holdingPeriod &&
        formData.exitStrategy
      );
    }
    if (step === 3) {
      return (
        formData.assetName &&
        formData.detailedDescription &&
        formData.valuationProvider &&
        formData.valuationDate &&
        formData.encumbrances
      );
    }
    if (step === 4) {
      return (
        formData.jurisdiction &&
        formData.spvName &&
        formData.structure &&
        formData.legalCounsel &&
        formData.docHash
      );
    }
    if (step === 5) {
      return formData.trustClass;
    }
    if (step === 6) {
      return formData.primaryVerifier && formData.primaryConfidence && formData.secondaryVerifier && formData.secondaryConfidence;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-[oklch(0.96_0.01_285)]">
      {/* Top Header */}
      <header className="border-b border-[oklch(0.9_0.02_285)] bg-white sticky top-0 z-20">
        <div className="flex items-center gap-8 px-8 py-4">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <span className="flex items-center justify-center w-10 h-10 rounded bg-primary text-primary-foreground font-bold text-lg">
              E
            </span>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              ENCLAVES
            </span>
          </a>
          <nav className="flex items-center gap-8 text-sm text-[oklch(0.35_0.02_285)]">
            <a href="/home" className="hover:text-foreground transition-colors">Home</a>
            <a href="/how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="/asset-classes" className="hover:text-foreground transition-colors">Asset Classes</a>
            <a href="/my-assets" className="hover:text-foreground transition-colors">My Assets</a>
            <a href="/my-profile" className="hover:text-foreground transition-colors">My Profile</a>
            <a href="/token" className="hover:text-foreground transition-colors">Token</a>
            <a href="#" className="hover:text-foreground transition-colors">About</a>
          </nav>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 shrink-0 border-r border-[oklch(0.9_0.02_285)] bg-white min-h-[calc(100vh-65px)] flex flex-col">
          {/* Trust Score */}
          <div className="p-4 bg-primary text-primary-foreground rounded-none">
            <p className="text-xs font-medium tracking-wider opacity-90">TRUST SCORE</p>
            <p className="text-2xl font-bold mt-1">5</p>
            <p className="text-xs opacity-75">/100</p>
            <div className="mt-4 space-y-3">
              {TRUST_METRICS.map((m) => (
                <div key={m.key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{m.key}</span>
                    <span>{m.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-white/60"
                      style={{ width: `${m.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="p-4 flex-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Steps
            </p>
            <ol className="space-y-1">
              {STEPS.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setStep(s.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      step === s.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium shrink-0 ${
                        step === s.id
                          ? "bg-white/20 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {String(s.id).padStart(2, "0")}
                    </span>
                    <span className="text-sm truncate">{s.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="p-4 border-t border-[oklch(0.9_0.02_285)]">
            <a
              href="#"
              className="text-sm text-primary hover:underline"
            >
              Need help? Contact support
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-3xl mx-auto bg-white rounded-xl border border-[oklch(0.9_0.02_285)] shadow-sm p-8">
            {/* Step 1: Tell Us About You */}
            {step === 1 && (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                    {String(step).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Step {step} of {STEPS.length}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Tell Us About You
                </h1>
                <p className="text-muted-foreground mb-6">
                  Your identity is verified independently to create accountability and reputation traceability.
                </p>

                {/* Info Box */}
                <div className="flex gap-4 p-4 rounded-lg border border-[oklch(0.9_0.02_285)] bg-[oklch(0.98_0.01_285)] mb-8">
                  <div className="w-1 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Why we need this</p>
                    <p className="text-sm text-muted-foreground">
                      Enclave does not assume issuer honesty. Independent verification creates accountability.
                    </p>
                  </div>
                </div>

                {/* Form - Two columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field
                    label="Full Name"
                    value={formData.fullName}
                    onChange={(v) => updateField("fullName", v)}
                    placeholder="Mohammed Al-Rashid"
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(v) => updateField("email", v)}
                    placeholder="mo@company.com"
                  />
                  <Field
                    label="Company Name"
                    value={formData.companyName}
                    onChange={(v) => updateField("companyName", v)}
                    placeholder="Enclave Holdings Ltd"
                  />
                  <SelectField
                    label="Entity Type"
                    value={formData.entityType}
                    onChange={(v) => updateField("entityType", v)}
                    options={ENTITY_TYPES}
                    placeholder="Select..."
                  />
                  <div className="md:col-span-2">
                    <Field
                      label="Business Address"
                      value={formData.businessAddress}
                      onChange={(v) => updateField("businessAddress", v)}
                      placeholder="Gate District 2, DIFC, Dubai, UAE"
                    />
                  </div>
                  <Field
                    label="Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(v) => updateField("phone", v)}
                    placeholder="+971 50 xxx xxxx"
                  />
                  <SelectField
                    label="KYC/KYB Method"
                    value={formData.kycMethod}
                    onChange={(v) => updateField("kycMethod", v)}
                    options={KYC_METHODS}
                    placeholder="Select..."
                    hint="Required before onboarding"
                  />
                  <UploadField
                    label="ID Document"
                    file={formData.idDocument}
                    onSelect={() => idFileRef.current?.click()}
                    inputRef={idFileRef}
                    onFileChange={(e) => handleFileChange("idDocument", e)}
                  />
                  <UploadField
                    label="Certificate of Incorporation"
                    file={formData.certificateOfIncorporation}
                    onSelect={() => certFileRef.current?.click()}
                    inputRef={certFileRef}
                    onFileChange={(e) => handleFileChange("certificateOfIncorporation", e)}
                  />
                </div>
              </>
            )}

            {/* Step 2: Your Project */}
            {step === 2 && (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                    02
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Step 2 of {STEPS.length}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Your Project
                </h1>
                <p className="text-muted-foreground mb-6">
                  What are you tokenizing, why, and who is it for? This shapes your entire trust structure.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Field
                      label="Project Name"
                      value={formData.projectName}
                      onChange={(v) => updateField("projectName", v)}
                      placeholder="Marina Bay Tower Fractional Ownership"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <TextareaField
                      label="Description"
                      value={formData.description}
                      onChange={(v) => updateField("description", v)}
                      placeholder="Describe what you're tokenizing and what investors can expect..."
                    />
                  </div>
                  <SelectField
                    label="Asset Type"
                    value={formData.assetType}
                    onChange={(v) => updateField("assetType", v)}
                    options={ASSET_TYPES}
                    placeholder="Select..."
                  />
                  <div>
                    <Field
                      label="Asset Value (USD)"
                      value={formData.assetValue}
                      onChange={(v) => updateField("assetValue", v)}
                      placeholder="10000000"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Determines staking bond.</p>
                  </div>
                  <Field
                    label="Funding Target (USD)"
                    value={formData.fundingTarget}
                    onChange={(v) => updateField("fundingTarget", v)}
                    placeholder="10000000"
                  />
                  <SelectField
                    label="Target Investors"
                    value={formData.targetInvestors}
                    onChange={(v) => updateField("targetInvestors", v)}
                    options={TARGET_INVESTORS}
                    placeholder="Select..."
                  />
                  <SelectField
                    label="Holding Period"
                    value={formData.holdingPeriod}
                    onChange={(v) => updateField("holdingPeriod", v)}
                    options={HOLDING_PERIODS}
                    placeholder="Select..."
                  />
                  <div className="md:col-span-2">
                    <SelectField
                      label="Exit Strategy"
                      value={formData.exitStrategy}
                      onChange={(v) => updateField("exitStrategy", v)}
                      options={EXIT_STRATEGIES}
                      placeholder="Select..."
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Asset Details */}
            {step === 3 && (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                    03
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Step 3 of {STEPS.length}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Asset Details
                </h1>
                <p className="text-muted-foreground mb-6">
                  Provide specifics — ownership, valuation, location, and supporting documents.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Field
                      label="Asset Name"
                      value={formData.assetName}
                      onChange={(v) => updateField("assetName", v)}
                      placeholder="Marina Bay Tower — Unit 4201"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <TextareaField
                      label="Detailed Description"
                      value={formData.detailedDescription}
                      onChange={(v) => updateField("detailedDescription", v)}
                      placeholder="Location, condition, specifications, provenance..."
                    />
                  </div>
                  <Field
                    label="Valuation Provider"
                    value={formData.valuationProvider}
                    onChange={(v) => updateField("valuationProvider", v)}
                    placeholder="Knight Frank, CBRE..."
                  />
                  <Field
                    label="Valuation Date"
                    type="date"
                    value={formData.valuationDate}
                    onChange={(v) => updateField("valuationDate", v)}
                    placeholder="dd/mm/yyyy"
                  />
                  <div className="md:col-span-2">
                    <SelectField
                      label="Existing Encumbrances?"
                      value={formData.encumbrances}
                      onChange={(v) => updateField("encumbrances", v)}
                      options={ENCUMBRANCES_OPTIONS}
                      placeholder="Select..."
                    />
                  </div>
                  <UploadField
                    label="Proof of Ownership"
                    file={formData.proofOfOwnership}
                    onSelect={() => proofOfOwnershipRef.current?.click()}
                    inputRef={proofOfOwnershipRef}
                    onFileChange={(e) => handleFileChange("proofOfOwnership", e)}
                  />
                  <UploadField
                    label="Valuation Report"
                    file={formData.valuationReport}
                    onSelect={() => valuationReportRef.current?.click()}
                    inputRef={valuationReportRef}
                    onFileChange={(e) => handleFileChange("valuationReport", e)}
                  />
                  <UploadField
                    label="Insurance"
                    file={formData.insurance}
                    onSelect={() => insuranceRef.current?.click()}
                    inputRef={insuranceRef}
                    onFileChange={(e) => handleFileChange("insurance", e)}
                  />
                </div>
              </>
            )}

            {/* Step 4: Legal Structure & SPV */}
            {step === 4 && (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                    04
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Step 4 of {STEPS.length}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Legal Structure & SPV
                </h1>
                <p className="text-muted-foreground mb-6">
                  Jurisdiction and SPV formation — the legal foundation of your trust score (L = J x S).
                </p>

                {/* Info Box */}
                <div className="flex gap-4 p-4 rounded-lg border border-[oklch(0.9_0.02_285)] bg-[oklch(0.98_0.01_285)] mb-8">
                  <div className="w-1 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm text-foreground">
                      The SPV holds the asset in trust for token holders. The token ledger is the authoritative ownership record.
                    </p>
                  </div>
                </div>

                {/* Jurisdiction cards */}
                <p className="text-sm font-medium text-foreground mb-3 uppercase tracking-wide">
                  Jurisdiction
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  {JURISDICTIONS.map((j) => (
                    <button
                      key={j.id}
                      type="button"
                      onClick={() => updateField("jurisdiction", j.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 text-left transition-colors ${
                        formData.jurisdiction === j.id
                          ? "border-primary bg-primary/5"
                          : "border-[oklch(0.9_0.02_285)] bg-white hover:border-primary/50"
                      }`}
                    >
                      <span className="text-2xl">{j.flag}</span>
                      <span className="text-sm font-medium text-foreground">{j.name}</span>
                      <span className="text-xs text-muted-foreground">{j.score}</span>
                    </button>
                  ))}
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field
                    label="SPV Name"
                    value={formData.spvName}
                    onChange={(v) => updateField("spvName", v)}
                    placeholder="Enclave SPV I Ltd"
                  />
                  <SelectField
                    label="Structure"
                    value={formData.structure}
                    onChange={(v) => updateField("structure", v)}
                    options={STRUCTURE_OPTIONS}
                    placeholder="Select..."
                  />
                  <Field
                    label="Legal Counsel"
                    value={formData.legalCounsel}
                    onChange={(v) => updateField("legalCounsel", v)}
                    placeholder="Clifford Chance..."
                  />
                  <Field
                    label="Doc Hash (On-Chain)"
                    value={formData.docHash}
                    onChange={(v) => updateField("docHash", v)}
                    placeholder="0x3f8a..."
                  />
                  <UploadField
                    label="SPV Docs"
                    file={formData.spvDocs}
                    onSelect={() => spvDocsRef.current?.click()}
                    inputRef={spvDocsRef}
                    onFileChange={(e) => handleFileChange("spvDocs", e)}
                  />
                  <UploadField
                    label="Legal Opinion"
                    file={formData.legalOpinion}
                    onSelect={() => legalOpinionRef.current?.click()}
                    inputRef={legalOpinionRef}
                    onFileChange={(e) => handleFileChange("legalOpinion", e)}
                  />
                </div>
              </>
            )}

            {/* Step 5: Trust Classification */}
            {step === 5 && (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                    05
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Step 5 of {STEPS.length}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Trust Classification
                </h1>
                <p className="text-muted-foreground mb-6">
                  Classified by the strength of the trust anchor — not asset type. Determines verification and bonding.
                </p>

                {/* Info Box */}
                <div className="flex gap-4 p-4 rounded-lg border border-[oklch(0.9_0.02_285)] bg-[oklch(0.98_0.01_285)] mb-8">
                  <div className="w-1 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm text-foreground">
                      These are structural categories — not marketing labels. Weaker anchors need deeper verification and higher bonding.
                    </p>
                  </div>
                </div>

                {/* Trust class cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {TRUST_CLASSES.map((c) => {
                    const colorClasses: Record<string, string> = {
                      emerald: "border-emerald-500/50 bg-emerald-50 data-[selected]:border-emerald-600 data-[selected]:bg-emerald-100 [&_.tag]:bg-emerald-200 [&_.tag]:text-emerald-800",
                      blue: "border-blue-500/50 bg-blue-50 data-[selected]:border-blue-600 data-[selected]:bg-blue-100 [&_.tag]:bg-blue-200 [&_.tag]:text-blue-800",
                      violet: "border-violet-500/50 bg-violet-50 data-[selected]:border-violet-600 data-[selected]:bg-violet-100 [&_.tag]:bg-violet-200 [&_.tag]:text-violet-800",
                      orange: "border-orange-500/50 bg-orange-50 data-[selected]:border-orange-600 data-[selected]:bg-orange-100 [&_.tag]:bg-orange-200 [&_.tag]:text-orange-800",
                      red: "border-red-500/50 bg-red-50 data-[selected]:border-red-600 data-[selected]:bg-red-100 [&_.tag]:bg-red-200 [&_.tag]:text-red-800",
                      neutral: "border-neutral-400/50 bg-neutral-100 data-[selected]:border-neutral-600 data-[selected]:bg-neutral-200 [&_.tag]:bg-neutral-300 [&_.tag]:text-neutral-800",
                    };
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => updateField("trustClass", c.id)}
                        data-selected={formData.trustClass === c.id ? "" : undefined}
                        className={`flex flex-col gap-3 p-4 rounded-lg border-2 text-left transition-colors hover:opacity-90 ${
                          formData.trustClass === c.id
                            ? colorClasses[c.color]
                            : "border-[oklch(0.9_0.02_285)] bg-white hover:border-primary/30"
                        }`}
                      >
                        <div>
                          <p className="font-semibold text-foreground text-sm">{c.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <span className={`tag px-2 py-0.5 rounded text-xs font-medium`}>{c.bond}</span>
                          <span className={`tag px-2 py-0.5 rounded text-xs font-medium`}>Risk: {c.risk}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Step 6: Multi-Party Verification */}
            {step === 6 && (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                    06
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Step 6 of {STEPS.length}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Multi-Party Verification
                </h1>
                <p className="text-muted-foreground mb-6">
                  V = 1 - Π(1 - vᵢ) — independent sources compound trust nonlinearly.
                </p>

                {/* Verification Sources card */}
                <div className="rounded-lg border border-[oklch(0.9_0.02_285)] bg-[oklch(0.98_0.01_285)] p-6 mb-6">
                  <p className="text-xs font-medium text-primary uppercase tracking-wider mb-4">
                    Verification Sources
                  </p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field
                        label="Primary Verifier"
                        value={formData.primaryVerifier}
                        onChange={(v) => updateField("primaryVerifier", v)}
                        placeholder="Licensed verifier..."
                      />
                      <SelectField
                        label="Confidence"
                        value={formData.primaryConfidence}
                        onChange={(v) => updateField("primaryConfidence", v)}
                        options={CONFIDENCE_OPTIONS}
                        placeholder="Select..."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field
                        label="Secondary Verifier"
                        value={formData.secondaryVerifier}
                        onChange={(v) => updateField("secondaryVerifier", v)}
                        placeholder="Independent..."
                      />
                      <SelectField
                        label="Confidence"
                        value={formData.secondaryConfidence}
                        onChange={(v) => updateField("secondaryConfidence", v)}
                        options={CONFIDENCE_OPTIONS}
                        placeholder="Select..."
                      />
                    </div>
                    <div className="flex flex-wrap gap-6 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.custodianConfirmation}
                          onChange={(e) => updateField("custodianConfirmation", e.target.checked)}
                          className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">Custodian confirmation</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.insuranceVerified}
                          onChange={(e) => updateField("insuranceVerified", e.target.checked)}
                          className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">Insurance verified</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Calculated V display */}
                <div className="rounded-lg border border-[oklch(0.9_0.02_285)] bg-[oklch(0.97_0.02_285)] px-4 py-3 mb-6">
                  <p className="text-sm font-mono text-muted-foreground">
                    V = 1 – Π(1 - vᵢ) = 1 - Ø = 0.0%
                  </p>
                </div>

                {/* Document uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <UploadField
                    label="Verification Cert"
                    file={formData.verificationCert}
                    onSelect={() => verificationCertRef.current?.click()}
                    inputRef={verificationCertRef}
                    onFileChange={(e) => handleFileChange("verificationCert", e)}
                  />
                  <UploadField
                    label="Encumbrance Search"
                    file={formData.encumbranceSearch}
                    onSelect={() => encumbranceSearchRef.current?.click()}
                    inputRef={encumbranceSearchRef}
                    onFileChange={(e) => handleFileChange("encumbranceSearch", e)}
                  />
                </div>
              </>
            )}

            {/* Step 7: Token Design */}
            {step === 7 && (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                    07
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Step 7 of {STEPS.length}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Token Design
                </h1>
                <p className="text-muted-foreground mb-6">
                  Supply, pricing, and restrictions. Minting is gated by authorization conditions.
                </p>

                {/* Token configuration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <SelectField
                    label="Token Standard"
                    value={formData.tokenStandard}
                    onChange={(v) => updateField("tokenStandard", v)}
                    options={TOKEN_STANDARD_OPTIONS}
                    placeholder="Select..."
                  />
                  <SelectField
                    label="Blockchain"
                    value={formData.blockchain}
                    onChange={(v) => updateField("blockchain", v)}
                    options={BLOCKCHAIN_OPTIONS}
                    placeholder="Select..."
                  />
                  <Field
                    label="Total Supply"
                    value={formData.totalSupply}
                    onChange={(v) => updateField("totalSupply", v)}
                    placeholder="100000"
                  />
                  <Field
                    label="Price/Token"
                    value={formData.pricePerToken}
                    onChange={(v) => updateField("pricePerToken", v)}
                    placeholder="100"
                  />
                  <Field
                    label="Min Investment"
                    value={formData.minInvestment}
                    onChange={(v) => updateField("minInvestment", v)}
                    placeholder="1000"
                  />
                  <SelectField
                    label="Transfers"
                    value={formData.transfers}
                    onChange={(v) => updateField("transfers", v)}
                    options={TRANSFERS_OPTIONS}
                    placeholder="Select..."
                  />
                  <SelectField
                    label="Secondary Mkt"
                    value={formData.secondaryMkt}
                    onChange={(v) => updateField("secondaryMkt", v)}
                    options={SECONDARY_MKT_OPTIONS}
                    placeholder="Select..."
                  />
                </div>

                {/* Mint Authorization */}
                <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-6">
                  <p className="text-sm font-bold text-primary uppercase tracking-wider mb-4">
                    Mint Authorization
                  </p>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.verificationComplete}
                        onChange={(e) => updateField("verificationComplete", e.target.checked)}
                        className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-foreground">Verification complete</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.spvActive}
                        onChange={(e) => updateField("spvActive", e.target.checked)}
                        className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-foreground">SPV active</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.noEncumbrances}
                        onChange={(e) => updateField("noEncumbrances", e.target.checked)}
                        className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-foreground">No encumbrances</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.stakeBonded}
                        onChange={(e) => updateField("stakeBonded", e.target.checked)}
                        className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-foreground">Stake bonded (step 8)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.coolingDone}
                        onChange={(e) => updateField("coolingDone", e.target.checked)}
                        className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-foreground">Cooling done</span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Step 8: Economic Bonding */}
            {step === 8 && (() => {
              const assetValue = parseFloat(formData.assetValue) || 0;
              const bondClassData = formData.bondClass ? BOND_CLASSES.find((b) => b.id === formData.bondClass) : null;
              const requiredStake = bondClassData ? assetValue * bondClassData.pct : 0;
              const yourStakeNum = parseFloat(formData.yourStake) || 0;
              const bondingScore = requiredStake > 0 ? Math.min(1, yourStakeNum / requiredStake) : 0;
              const needMore = Math.max(0, requiredStake - yourStakeNum);
              return (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                      08
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Step 8 of {STEPS.length}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Economic Bonding
                  </h1>
                  <p className="text-muted-foreground mb-2">
                    E = min(1, Stake / RequiredStake)
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Transforms fraud from low-cost gamble to material risk.
                  </p>

                  {/* Info Box */}
                  <div className="flex gap-4 p-4 rounded-lg border border-[oklch(0.9_0.02_285)] bg-[oklch(0.98_0.01_285)] mb-8">
                    <div className="w-1 shrink-0 rounded-full bg-primary" />
                    <div>
                      <p className="text-sm text-foreground">
                        Staking alone is insufficient — combined with detection probability and visibility, it creates economic rationality against fraud.
                      </p>
                    </div>
                  </div>

                  {/* Required Stake */}
                  <p className="text-xs font-medium text-primary uppercase tracking-wider mb-2">
                    Required Stake
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    <span className="text-primary font-medium">α(?)</span> × ${assetValue.toLocaleString()} ={" "}
                    <span className="text-primary font-medium">${requiredStake.toLocaleString()}</span>
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {BOND_CLASSES.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => updateField("bondClass", b.id)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                          formData.bondClass === b.id
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-[oklch(0.9_0.02_285)] bg-white text-foreground hover:border-primary/50"
                        }`}
                      >
                        {b.id} ({b.range})
                      </button>
                    ))}
                  </div>

                  {/* Your Stake */}
                  <div className="mb-8">
                    <label className="block text-xs font-medium text-primary uppercase tracking-wider mb-2">
                      Your Stake (USD in ENCL)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formData.yourStake}
                      onChange={(e) => updateField("yourStake", e.target.value)}
                      className="w-full max-w-xs px-4 py-3 rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
                    />
                  </div>

                  {/* Bonding Score */}
                  <div>
                    <p className="text-xs font-medium text-foreground uppercase tracking-wider mb-2">
                      Bonding Score (E)
                    </p>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex-1 h-4 rounded-full bg-[oklch(0.9_0.02_285)] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${bondingScore * 100}%` }}
                        />
                      </div>
                      <span className={`text-xl font-bold ${bondingScore >= 1 ? "text-emerald-600" : "text-red-600"}`}>
                        {(bondingScore * 100).toFixed(0)}%
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {needMore > 0 ? `Need $${needMore.toLocaleString()} more` : "Bond requirement met"}
                    </p>
                  </div>
                </>
              );
            })()}

            {/* Step 9: Compliance & Monitoring */}
            {step === 9 && (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                    09
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Step 9 of {STEPS.length}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Compliance & Monitoring
                </h1>
                <p className="text-muted-foreground mb-6">
                  P = exp(-λ∆t) x C — trust decays without re-verification. Set up continuous monitoring.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <SelectField
                    label="Regulatory Framework"
                    value={formData.regulatoryFramework}
                    onChange={(v) => updateField("regulatoryFramework", v)}
                    options={REGULATORY_FRAMEWORK_OPTIONS}
                    placeholder="Select..."
                  />
                  <SelectField
                    label="Monitoring"
                    value={formData.monitoring}
                    onChange={(v) => updateField("monitoring", v)}
                    options={MONITORING_OPTIONS}
                    placeholder="Select..."
                  />
                  <SelectField
                    label="Audit Schedule"
                    value={formData.auditSchedule}
                    onChange={(v) => updateField("auditSchedule", v)}
                    options={AUDIT_SCHEDULE_OPTIONS}
                    placeholder="Select..."
                  />
                  <SelectField
                    label="Re-Verification"
                    value={formData.reVerification}
                    onChange={(v) => updateField("reVerification", v)}
                    options={RE_VERIFICATION_OPTIONS}
                    placeholder="Select..."
                  />
                  <SelectField
                    label="Reputation"
                    value={formData.reputation}
                    onChange={(v) => updateField("reputation", v)}
                    options={REPUTATION_OPTIONS}
                    placeholder="Select..."
                  />
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
                      Days Since Last Verification
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formData.daysSinceLastVerification}
                      onChange={(e) => updateField("daysSinceLastVerification", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Trust decays over time</p>
                  </div>
                </div>

                {/* Info Box */}
                <div className="flex gap-4 p-4 rounded-lg border border-[oklch(0.9_0.02_285)] bg-[oklch(0.98_0.01_285)]">
                  <div className="w-1 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-bold text-foreground mb-1">Enforcement</p>
                    <p className="text-sm text-muted-foreground">
                      Anomalies freeze issuance and restrict transfers. AI agents monitor in real-time.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Step 10: Trust Score & Certificate */}
            {step === 10 && (() => {
              const L = 0, V = 0;
              const assetVal = parseFloat(formData.assetValue) || 0;
              const bondClassData = formData.bondClass ? BOND_CLASSES.find((b) => b.id === formData.bondClass) : null;
              const requiredStake = bondClassData ? assetVal * bondClassData.pct : 0;
              const yourStake = parseFloat(formData.yourStake) || 0;
              const E = requiredStake > 0 ? Math.min(100, (yourStake / requiredStake) * 100) : 0;
              const P = 0;
              const R = 50;
              const T = Math.round(0.25 * L + 0.3 * V + 0.2 * E + 0.15 * P + 0.1 * R);
              const components = [
                { label: "L - J×S", w: 0.25, val: L, pts: (0.25 * L).toFixed(1), color: "bg-emerald-500" },
                { label: "V - 1-Π(1-vᵢ)", w: 0.3, val: V, pts: (0.3 * V).toFixed(1), color: "bg-blue-500" },
                { label: "E - Stake/Req", w: 0.2, val: Math.round(E), pts: (0.2 * E).toFixed(1), color: "bg-violet-500" },
                { label: "P - e^(-λΔt)×C", w: 0.15, val: P, pts: (0.15 * P).toFixed(1), color: "bg-orange-500" },
                { label: "R - History", w: 0.1, val: R, pts: (0.1 * R).toFixed(1), color: "bg-amber-500" },
              ];
              const trustClassLabel = formData.trustClass ? TRUST_CLASSES.find((c) => c.id === formData.trustClass)?.name?.replace(/^Class \w+: /, "") || "-" : "-";
              const jurisdictionLabel = formData.jurisdiction ? JURISDICTIONS.find((j) => j.id === formData.jurisdiction)?.name || "-" : "-";
              return (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">10</span>
                    <span className="text-sm text-muted-foreground">Step 10 of {STEPS.length}</span>
                  </div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">Trust Score & Certificate</h1>
                  <p className="text-muted-foreground mb-8">Your transparent, reproducible, publicly queryable trust profile.</p>

                  {/* Main Trust Score */}
                  <div className="bg-primary text-primary-foreground rounded-xl p-8 mb-8 text-center">
                    <p className="text-6xl font-bold">{T}</p>
                    <p className="text-sm uppercase tracking-wider mt-2 opacity-90">Trust Score</p>
                    <div className="mt-4 h-2 rounded-full bg-white/20 overflow-hidden max-w-xs mx-auto">
                      <div className="h-full rounded-full bg-white/70" style={{ width: `${T}%` }} />
                    </div>
                  </div>

                  {/* Score Components */}
                  <div className="space-y-3 mb-8">
                    {components.map((c) => (
                      <div key={c.label} className="flex items-center justify-between p-4 rounded-lg border border-[oklch(0.9_0.02_285)] bg-[oklch(0.98_0.01_285)]">
                        <div>
                          <p className="text-sm font-medium text-foreground">{c.label}</p>
                          <p className="text-xs text-muted-foreground">w={c.w}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`flex items-center justify-center w-8 h-8 rounded-full ${c.color} text-white text-sm font-medium`}>{c.val}</span>
                          <span className="text-sm text-muted-foreground">+{c.pts}pts</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-mono text-muted-foreground mb-8">
                    T = 0.25({L}) + 0.3({V}) + 0.2({E.toFixed(0)}) + 0.15({P}) + 0.1({R}) = {T}
                  </p>

                  {/* Enclave Trust Certificate */}
                  <div className="rounded-xl border-2 border-primary bg-primary text-primary-foreground p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-xs uppercase tracking-wider opacity-80">Enclave Trust Certificate</p>
                        <p className="text-2xl font-bold mt-1">{formData.projectName || "Untitled"}</p>
                      </div>
                      <p className="text-4xl font-bold">{T}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-6 text-sm">
                      <div>
                        <p className="text-xs opacity-75 uppercase">Trust Class</p>
                        <p className="font-medium">{trustClassLabel}</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-75 uppercase">Asset Value</p>
                        <p className="font-medium">{assetVal ? `$${assetVal.toLocaleString()}` : "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-75 uppercase">Token</p>
                        <p className="font-medium">{formData.tokenStandard || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-75 uppercase">Jurisdiction</p>
                        <p className="font-medium">{jurisdictionLabel}</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-75 uppercase">Stake</p>
                        <p className="font-medium">{yourStake ? `$${yourStake.toLocaleString()}` : "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-75 uppercase">Chain</p>
                        <p className="font-medium">{formData.blockchain || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-75 uppercase">SPV</p>
                        <p className="font-medium">{formData.spvName || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-75 uppercase">Required</p>
                        <p className="font-medium">${requiredStake.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-75 uppercase">Supply</p>
                        <p className="font-medium">{formData.totalSupply || "-"}</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/20 flex gap-4 text-xs opacity-90">
                      <span>Issued: {new Date().toISOString().slice(0, 10)}</span>
                      <span>Monitor: {formData.monitoring || "-"}</span>
                      <span>Re-verify: {formData.reVerification || "-"}</span>
                    </div>
                  </div>
                </>
              );
            })()}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-[oklch(0.9_0.02_285)]">
              <a
                href="#"
                className="text-sm text-primary hover:underline"
              >
                Need help? Contact support
              </a>
              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  disabled={step === 1}
                >
                  Back
                </Button>
                <Button
                  onClick={() =>
                    step < STEPS.length
                      ? setStep((s) => s + 1)
                      : alert("Published! (MVP – no backend yet)")
                  }
                  disabled={step < 10 ? !canProceed() : false}
                >
                  {step < STEPS.length ? "Continue" : "Publish"}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border border-input bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
      />
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 rounded-lg border border-input bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 resize-none"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23717787%22 stroke-width=%222%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {hint && (
        <p className="text-xs text-muted-foreground mt-1">{hint}</p>
      )}
    </div>
  );
}

function UploadField({
  label,
  file,
  onSelect,
  inputRef,
  onFileChange,
}: {
  label: string;
  file: File | null;
  onSelect: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
        {label}
      </label>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={onFileChange}
      />
      <button
        type="button"
        onClick={onSelect}
        className="w-full px-4 py-6 rounded-lg border-2 border-dashed border-[oklch(0.85_0.04_285)] bg-[oklch(0.96_0.03_285)] hover:bg-[oklch(0.94_0.04_285)] hover:border-[oklch(0.75_0.08_285)] transition-colors text-muted-foreground text-sm"
      >
        {file ? file.name : "Click to upload"}
      </button>
    </div>
  );
}

function Button({
  children,
  onClick,
  disabled,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-colors ${
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
      }`}
    >
      {children}
    </button>
  );
}
