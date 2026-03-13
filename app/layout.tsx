import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
