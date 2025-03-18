"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import SuperJSON from "superjson";

import { type AppRouter } from "~/server/api/root";

// Create a client-side singleton to avoid recreating for each request
let clientQueryClient: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === 'undefined') return new QueryClient();
  return clientQueryClient ?? (clientQueryClient = new QueryClient());
};

export const api = createTRPCReact<AppRouter>();

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function TRPCReactProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Skip tRPC provider in case of errors to prevent app from breaking
  try {
    const [queryClient] = useState(() => getQueryClient());

    const [trpcClient] = useState(() =>
      api.createClient({
        links: [
          loggerLink({
            enabled: (op) =>
              process.env.NODE_ENV === "development" ||
              (op.direction === "down" && op.result instanceof Error),
          }),
          httpBatchLink({
            url: "/api/trpc",
            transformer: SuperJSON,
          }),
        ],
      })
    );

    return (
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </api.Provider>
    );
  } catch (error) {
    console.error("Error initializing TRPC React provider:", error);
    // If there's an error, return children without the provider
    return <>{children}</>;
  }
}

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
