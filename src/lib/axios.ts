import axios from "axios";
export const lemonSqueezyClient = (lemonSqueezyApiKey?: string) => {
  const apiKey =
    lemonSqueezyApiKey || process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("Lemon Squeezy API key is missing");
  }

  console.log("[DEBUG] API Key:", apiKey ? "✅ Loaded" : "❌ Missing");

  const client = axios.create({
    baseURL: "https://api.lemonsqueezy.com/v1",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${apiKey}`,
    },
  });

  // Add request interceptor for debugging
  client.interceptors.request.use((config) => {
    console.log("Request Headers:", config.headers);
    return config;
  });

  return client;
};
