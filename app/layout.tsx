import "./globals.css";

export const metadata = {
  title: "Jiangbin Huang Portfolio",
  description: "Selected data, modeling, and applied AI projects by Jiangbin Huang.",
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
