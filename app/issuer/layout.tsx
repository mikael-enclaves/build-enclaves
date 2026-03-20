"use client";

import { IssuerLayout } from "@/components/IssuerLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <IssuerLayout>{children}</IssuerLayout>;
}
