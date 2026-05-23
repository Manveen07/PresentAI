"use server";
import axios from "axios";
import { lemonSqueezyClient } from "@/lib/axios";

export const buyProduct = async (buyUserId: string) => {};

export const buySubcription = async (buyUserId: string) => {
  try {
    const res = await lemonSqueezyClient(
      process.env.LEMON_SQUEEZY_API_KEY
    ).post("/checkouts", {
      data: {
        type: "checkouts",
        attributes: {
          product_options: {
            redirect_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`,
          },
          checkout_data: {
            custom: {
              user_id: buyUserId,
            },
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: process.env.LEMON_SQUEEZY_STORE_ID,
            },
          },
          variant: {
            data: {
              type: "variants",
              id: process.env.LEMON_SQUEEZY_VARIANT_ID,
            },
          },
        },
      },
    });

    return {
      url: res.data.data.attributes.url,
      status: 200,
    };
  } catch (error) {
    console.error("[LemonSqueezy Error]:", error);
    if (axios.isAxiosError(error)) {
      console.error("Details:", error.response?.data);
      return {
        message: error.response?.data?.errors?.[0]?.detail || error.message,
        status: error.response?.status || 500,
      };
    }
    return {
      message: error instanceof Error ? error.message : "Unknown error",
      status: 500,
    };
  }
};
