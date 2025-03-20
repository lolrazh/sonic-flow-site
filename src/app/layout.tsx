import "@/styles/globals.css";

import { DM_Serif_Display, Lexend_Deca } from "next/font/google";
import { type Metadata } from "next";
import { ClientWrapper } from "@/components/client/ClientWrapper";
import { Polyfills } from "@/components/client/Polyfills";

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
  title: "Sonic Flow - AI-Powered Dictation Tool",
  description: "Sonic Flow is an AI-powered dictation tool that seamlessly transcribes your speech into any text field. Save time, boost productivity, and say goodbye to manual typing.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${lexendDeca.variable} dark`}>
      <head>
        <script src="https://cdn.paddle.com/paddle/v2/paddle.js" defer />
      </head>
      <body className="font-sans">
        <Polyfills />
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
