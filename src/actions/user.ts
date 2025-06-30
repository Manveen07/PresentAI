"use server";
import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 401 };
    }
    const userExist = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        PurchasedProjects: {
          select: {
            id: true,
          },
        },
      },
    });
    if (userExist) {
      return { status: 200, user: userExist };
    }
    const newUser = await client.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName + " " + user.lastName,
        profileImage: user.imageUrl,
      },
    });
    if (newUser) {
      return { status: 200, user: newUser };
    }
    return { status: 400 };
  } catch (error) {
    console.error("🛑 ️ Error in onAuthenticateUser):", error);
    return { status: 500 };
  }
};

export const updateUserLemonSqueezySettings = async (data: {
  lemonSqueezyApiKey: string;
  lemonSqueezyStoreId: string;
  lemonSqueezyWebhookSecret?: string;
}) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 401, error: "User not authenticated" };
    }

    const updateData: {
      lemonSqueezyApiKey: string;
      storeId: string;
      webhookSecret?: string;
    } = {
      lemonSqueezyApiKey: data.lemonSqueezyApiKey.trim(),
      storeId: data.lemonSqueezyStoreId.trim(),
    };

    if (
      data.lemonSqueezyWebhookSecret !== undefined &&
      data.lemonSqueezyWebhookSecret !== ""
    ) {
      updateData.webhookSecret = data.lemonSqueezyWebhookSecret;
    }

    const updatedUser = await client.user.update({
      where: { clerkId: user.id },
      data: updateData,
    });

    return { status: 200, user: updatedUser };
  } catch (error) {
    console.error("Error updating LemonSqueezy settings:", error);
    return { status: 500, error: "Internal Server Error" };
  }
};
