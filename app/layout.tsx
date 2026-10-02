import type { Metadata } from "next";
import { Poppins, Aleo, Source_Code_Pro } from "next/font/google";

import "./globals.css";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-mono",
  weight: ["400", "600"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins-sans",
  weight: ["400", "500", "600", "700"],
});

const aleo = Aleo({
  subsets: ["latin"],
  weight: ["400", "700"],
});


export const metadata: Metadata = {
  title: "Next.js on Pantheon",
  description: "Welcome to Next.js on Pantheon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${sourceCodePro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
