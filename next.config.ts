// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";
import dotenv from "dotenv";

// Load `.env.local`
dotenv.config();

const nextConfig: NextConfig = {
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY, // Ensures availability
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https", // or http
        hostname: "images.unsplash.com", // Example for unsplash
        port: "",
        pathname: "**", // Allow any path
      },
      {
        protocol: "https", // or http
        port: "",
        hostname: "via.placeholder.com", // Example for placeholder
        pathname: "/**",
        // ... other necessary domains
      },
      {
        protocol: "https", // or http
        port: "",
        hostname: "ucarecdn.com", // Example for placeholder
        pathname: "/**",
        // ... other necessary domains
      },
      {
        protocol: "https", // or http
        port: "",
        hostname: "placehold.co", // Example for placeholder
        pathname: "/**",
        // ... other necessary domains
      },
      {
        protocol: "https",
        hostname: "caidalleap.prodscus.blob.core.windows.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

// console.log("🔹 Next.js Config - GEMINI_API_KEY:", process.env.GEMINI_API_KEY); // Debugging

export default nextConfig;
