import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: "Jiangbin Huang Portfolio",
  description: "Portfolio website of Jiangbin Huang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
