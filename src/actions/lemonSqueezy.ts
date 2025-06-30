"use server";
import axios from "axios";
import { lemonSqueezyClient } from "@/lib/axios";

// export const buySubcription = async (buyUserId: string) => {
//   try {
//     const res = await lemonSqueezyClient(
//       process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY
//     ).post("/checkouts", {
//       data: {
//         type: "checkout",
//         attributes: {
//           checkout_data: {
//             custom: {
//               buyerUserId: buyUserId,
//             },
//           },
//           product_options: {
//             redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
//           },
//         },
//         relationships: {
//           store: {
//             data: {
//               type: "stores",
//               id: process.env.NEXT_PUBLIC_LPNONSQUEEZY_STORE_ID,
//             },
//           },
//           variant: {
//             data: {
//               type: "variants",
//               id: process.env.NEXT_PUBLIC_LPNONSQUEEZY_VARIANT_ID,
//             },
//           },
//         },
//       },
//     });
//     const checkoutUrl = res.data.data.attributes.url;
//     return { url: checkoutUrl, status: 200 };
//   } catch (error) {
//     console.error(error);
//     return { message: " Internal Server Error", status: 500 };
//   }
// };

export const buyProduct = async (buyUserId: string) => {};
export const buySubcription = async (buyUserId: string) => {
  try {
    const res = await lemonSqueezyClient(
      process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY
    ).post("/checkouts", {
      data: {
        type: "checkouts", // ✅ Plural
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
              id: process.env.NEXT_PUBLIC_LPNONSQUEEZY_STORE_ID,
            },
          },
          variant: {
            data: {
              type: "variants",
              id: process.env.NEXT_PUBLIC_LPNONSQUEEZY_VARIANT_ID,
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
