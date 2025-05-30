import "@/styles/globals.css";

import { DM_Serif_Display, Lexend_Deca } from "next/font/google";
import { type Metadata } from "next";
import MouseAwareGradient from "@/components/layout/MouseAwareGradient";
import { CookieBanner } from "@/components/layout";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
});

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "Sonic Flow - AI-Powered Dictation",
  description: "Sonic Flow is an AI-powered dictation tool that seamlessly transcribes your speech into any text field. Save time, boost productivity, and say goodbye to manual typing.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${lexendDeca.variable} dark`}>
      <body className="font-sans relative">
        <MouseAwareGradient />
        <div className="mouse-gradient-bg"></div>
        <div className="relative z-10">
          {children}
        </div>
        <CookieBanner />
      </body>
    </html>
  );
}
