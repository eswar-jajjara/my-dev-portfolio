import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/src/components/Navbar";

export const metadata: Metadata = {
  title: "Eswar Jajjara's Portfolio",
  description: "Eswar Jajjara's personal portfolio showcasing projects, certificates, and coding profiles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
