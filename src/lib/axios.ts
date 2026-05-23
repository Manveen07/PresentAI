import axios from "axios";

export const lemonSqueezyClient = (lemonSqueezyApiKey?: string) => {
  const apiKey =
    lemonSqueezyApiKey || process.env.LEMON_SQUEEZY_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("Lemon Squeezy API key is missing");
  }

  return axios.create({
    baseURL: "https://api.lemonsqueezy.com/v1",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${apiKey}`,
    },
  });
};
