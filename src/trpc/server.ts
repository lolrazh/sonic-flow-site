import "server-only";

import { experimental_createTRPCNextAppDirClient } from "@trpc/next/app-dir/client";
import { httpBatchLink } from "@trpc/client";
import { headers } from "next/headers";
import SuperJSON from "superjson";

import { type AppRouter } from "@/server/api/root";

function getBaseUrl() {
  if (typeof window !== "undefined") {
    // browser should use relative path
    return "";
  }

  if (process.env.VERCEL_URL) {
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const api = experimental_createTRPCNextAppDirClient<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          transformer: SuperJSON,
          headers: async () => {
            try {
              const headersList = await headers();
              return {
                "x-trpc-source": "rsc",
                cookie: headersList.get("cookie") ?? "",
                "user-agent": headersList.get("user-agent") ?? "",
              };
            } catch {
              // If headers() fails (e.g., during static generation), return minimal headers
              return {
                "x-trpc-source": "rsc",
              };
            }
          },
        }),
      ],
    };
  },
});
