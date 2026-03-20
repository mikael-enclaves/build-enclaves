"use client";

import Link from "next/link";

const READINESS_ITEMS = [
  { label: "SPV Ready", status: "Complete" },
  { label: "Asset Verified", status: "Complete" },
  { label: "Legal Stack Signed", status: "In Progress" },
  { label: "Mint Eligible", status: "Pending" },
];

const NEXT_ACTIONS = [
  { task: "Upload Articles of Incorporation", deadline: "Mar 22, 2026", priority: "high" },
  { task: "KYC Verification Pending", deadline: "Mar 25, 2026", priority: "high" },
  { task: "Approve Smart Contract Deployment", deadline: "Mar 28, 2026", priority: "medium" },
  { task: "Sign Custody Agreement", deadline: "Mar 30, 2026", priority: "low" },
];

const ACTIVE_ENCLAVES = [
  {
    enclave: "Green Energy Fund A",
    assetClass: "Renewables",
    trustClass: "Class III",
    readiness: "87%",
    status: "In Review",
    nextDeadline: "Mar 24, 2026",
  },
  {
    enclave: "Marina Bay Tower",
    assetClass: "Real Estate",
    trustClass: "Class II",
    readiness: "92%",
    status: "Active",
    nextDeadline: "Apr 01, 2026",
  },
  {
    enclave: "Dubai Logistics Hub",
    assetClass: "Infrastructure",
    trustClass: "Class IV",
    readiness: "64%",
    status: "Draft",
    nextDeadline: "Apr 15, 2026",
  },
  {
    enclave: "Receivables Pool B",
    assetClass: "Receivables",
    trustClass: "Class V",
    readiness: "78%",
    status: "Funding",
    nextDeadline: "Mar 29, 2026",
  },
];

export default function IssuerHomePage() {
  return (
    <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Issuer Home</h1>
                <p className="text-muted-foreground text-sm mt-0.5">
                  Trust readiness and next actions
                </p>
              </div>
              <Link
                href="/"
                className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                + Create New Enclave
              </Link>
            </div>

            {/* Onboarding Card */}
            <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6 mb-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Complete your issuer profile
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Set up your identity, verification, and compliance details to start tokenizing assets.
              </p>
              <Link
                href="/my-profile"
                className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90"
              >
                Start Onboarding
              </Link>
            </div>

            {/* Readiness Status Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {READINESS_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-4 shadow-sm"
                >
                  <p className="text-sm font-medium text-foreground mb-2">{item.label}</p>
                  <span
                    className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${
                      item.status === "Complete"
                        ? "bg-emerald-100 text-emerald-800"
                        : item.status === "In Progress"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-sky-100 text-sky-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Next Actions */}
            <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white p-6 mb-6 shadow-sm">
              <h2 className="text-base font-semibold text-foreground mb-4">Next Actions</h2>
              <ul className="space-y-3">
                {NEXT_ACTIONS.map((action, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-[oklch(0.95_0.02_285)] last:border-0"
                  >
                    <span className="text-sm text-foreground">{action.task}</span>
                    <span className="text-xs text-muted-foreground">{action.deadline}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* My Active Enclaves Table */}
            <div className="rounded-xl border border-[oklch(0.9_0.02_285)] bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[oklch(0.9_0.02_285)]">
                <h2 className="text-base font-semibold text-foreground">My Active Enclaves</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[oklch(0.98_0.01_285)] text-muted-foreground text-xs uppercase tracking-wider">
                      <th className="text-left px-6 py-3 font-medium">Enclave</th>
                      <th className="text-left px-6 py-3 font-medium">Asset Class</th>
                      <th className="text-left px-6 py-3 font-medium">Trust Class</th>
                      <th className="text-left px-6 py-3 font-medium">Readiness</th>
                      <th className="text-left px-6 py-3 font-medium">Status</th>
                      <th className="text-left px-6 py-3 font-medium">Next Deadline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ACTIVE_ENCLAVES.map((row, i) => (
                      <tr
                        key={i}
                        className="border-t border-[oklch(0.95_0.02_285)] hover:bg-[oklch(0.98_0.01_285)]"
                      >
                        <td className="px-6 py-4 font-medium text-foreground">{row.enclave}</td>
                        <td className="px-6 py-4 text-muted-foreground">{row.assetClass}</td>
                        <td className="px-6 py-4 text-muted-foreground">{row.trustClass}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-[oklch(0.9_0.02_285)] overflow-hidden">
                              <div
                                className="h-full rounded-full bg-primary"
                                style={{ width: row.readiness }}
                              />
                            </div>
                            <span className="text-foreground">{row.readiness}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                              row.status === "Active"
                                ? "bg-emerald-100 text-emerald-800"
                                : row.status === "In Review"
                                  ? "bg-amber-100 text-amber-800"
                                  : row.status === "Funding"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{row.nextDeadline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
    </div>
  );
}
