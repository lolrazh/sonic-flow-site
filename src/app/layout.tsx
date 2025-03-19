import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { DM_Serif_Display, Lexend_Deca } from "next/font/google";
import { type Metadata } from "next";
import { ClientWrapper } from "~/components/ClientWrapper";

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
    <html lang="en" className={`${GeistSans.variable} ${dmSerif.variable} ${lexendDeca.variable}`}>
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
