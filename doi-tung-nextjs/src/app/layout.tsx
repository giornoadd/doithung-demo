import type { Metadata } from "next";
import { Inter, Sarabun } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sarabun = Sarabun({
  subsets: ["thai"],
  weight: ["400", "600", "700"],
  variable: "--font-sarabun",
});

export const metadata: Metadata = {
  title: "Doi Tung Petty Cash Automation | Project Hub",
  description: "Interactive Demo for Doi Tung Petty Cash Automation Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sarabun.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
