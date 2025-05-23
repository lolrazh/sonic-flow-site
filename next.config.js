/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  // Transpile Supabase packages to fix compatibility issues
  transpilePackages: [
    "@supabase/auth-ui-react",
    "@supabase/auth-ui-shared",
    "@supabase/supabase-js",
    "@supabase/node-fetch"
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/**',
      },
    ],
  },
  webpack: (config) => {
    // Handle node-fetch polyfill properly
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "node-fetch": false,
      "encoding": false
    };
    
    return config;
  },
};

export default config;
