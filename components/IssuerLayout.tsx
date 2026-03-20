"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Grid3X3,
  Wallet,
  ShieldAlert,
  Lock,
  Scale,
  BarChart3,
  Settings,
} from "lucide-react";

const SIDEBAR_LINKS = [
  { label: "Dashboard", href: "/issuer", icon: LayoutDashboard },
  { label: "Onboarding", href: "/issuer#onboarding", icon: FileText },
  { label: "Enclaves", href: "/issuer#enclaves", icon: Grid3X3 },
  { label: "Assets", href: "/my-assets", icon: Wallet },
  { label: "Risk & Insolvency", href: "/issuer#risk", icon: ShieldAlert },
  { label: "Staking", href: "/issuer#staking", icon: Lock },
  { label: "Governance", href: "/issuer#governance", icon: Scale },
];

interface IssuerLayoutProps {
  children: React.ReactNode;
}

export function IssuerLayout({ children }: IssuerLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const isTotalAssets = pathname === "/issuer/assets";

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.01_285)] flex">
      {/* Sidebar */}
      <aside
        className={`relative ${
          sidebarCollapsed ? "w-[72px]" : "w-56"
        } shrink-0 border-r border-[oklch(0.9_0.02_285)] bg-white flex flex-col transition-all`}
      >
        <div className="flex-1 py-4">
          {SIDEBAR_LINKS.map((link) => {
            const Icon = link.icon;
            return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm transition-colors ${
                pathname === link.href
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-[oklch(0.4_0.02_285)] hover:bg-[oklch(0.96_0.02_285)]"
              }`}
            >
              <span className="shrink-0 w-5 h-5 flex items-center justify-center">
                <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
              </span>
              {!sidebarCollapsed && <span>{link.label}</span>}
            </Link>
            );
          })}
        </div>
        <div className="p-4 border-t border-[oklch(0.9_0.02_285)] space-y-1">
          <Link
            href="/issuer/assets"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
              sidebarCollapsed ? "justify-center" : ""
            } ${
              isTotalAssets
                ? "bg-primary text-primary-foreground font-medium"
                : "text-[oklch(0.4_0.02_285)] hover:bg-[oklch(0.96_0.02_285)]"
            }`}
          >
            <span className="shrink-0 w-5 h-5 flex items-center justify-center">
              <BarChart3 className="w-[18px] h-[18px]" strokeWidth={2} />
            </span>
            {!sidebarCollapsed && <span>Total Assets</span>}
          </Link>
          <Link
            href="/my-profile"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-[oklch(0.4_0.02_285)] hover:bg-[oklch(0.96_0.02_285)] ${
              sidebarCollapsed ? "justify-center" : ""
            }`}
          >
            <span className="shrink-0 w-5 h-5 flex items-center justify-center">
              <Settings className="w-[18px] h-[18px]" strokeWidth={2} />
            </span>
            {!sidebarCollapsed && <span>Settings</span>}
          </Link>
        </div>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-[oklch(0.9_0.02_285)] bg-white shadow-sm flex items-center justify-center text-[oklch(0.5_0.02_285)] hover:bg-[oklch(0.96_0.02_285)]"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? "→" : "←"}
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="relative h-12 shrink-0 bg-primary text-primary-foreground flex items-center justify-between px-6">
          <span className="font-bold text-lg tracking-tight">ENCLAVES</span>
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 text-sm text-white/90 font-medium">
            <span>TVL $139.5M</span>
            <span className="text-white/40">|</span>
            <span>10 Total Assets</span>
            <span className="text-white/40">|</span>
            <span>9 Issuers</span>
            <span className="text-white/40">|</span>
            <span>8 Categories</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-semibold text-sm">
              M
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
