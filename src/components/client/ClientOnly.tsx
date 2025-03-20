"use client";

import { useEffect, useState, type ReactNode } from "react";
import { TRPCReactProvider } from "@/trpc/react";

export default function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Only render the children on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Wrap children in TRPC provider on client side only
  return (
    <TRPCReactProvider>
      {children}
    </TRPCReactProvider>
  );
} 