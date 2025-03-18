import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClientWrapper } from "~/components/ClientWrapper";

export const metadata: Metadata = {
  title: "Sonic Flow - AI-Powered Dictation Tool",
  description: "Sonic Flow is an AI-powered dictation tool that seamlessly transcribes your speech into any text field. Save time, boost productivity, and say goodbye to manual typing.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
