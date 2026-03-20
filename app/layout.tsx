import type { Metadata } from "next";
import "./globals.css";
import { ConditionalStatsBar } from "@/components/ConditionalStatsBar";

export const metadata: Metadata = {
  title: "Enclave — RWA Tokenization Platform",
  description: "Tokenize real-world assets with trust and compliance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans overflow-x-hidden">
        <ConditionalStatsBar />
        {children}
      </body>
    </html>
  );
}
