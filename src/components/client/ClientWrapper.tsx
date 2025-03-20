"use client";

import { useState, useEffect, type ReactNode } from "react";
import { TRPCReactProvider } from "@/trpc/react";

export function ClientWrapper({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Wait until after client-side hydration to show content
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return null during SSR
  if (!mounted) {
    // You can optionally render a skeleton/loading state here
    return null;
  }

  // Once mounted on client, wrap children with TRPC provider
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
} 