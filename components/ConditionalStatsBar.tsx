"use client";

import { usePathname } from "next/navigation";
import { PlatformStatsBar } from "./PlatformStatsBar";

/** Show stats bar only on non-issuer routes (issuer has stats in its own header) */
export function ConditionalStatsBar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/issuer")) return null;
  return <PlatformStatsBar />;
}
