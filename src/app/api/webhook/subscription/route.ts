import crypto from "node:crypto";
import { NextRequest } from "next/server";
import { client } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signatureHeader = req.headers.get("X-Signature") || "";

    const hmac = crypto
      .createHmac("sha256", process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!)
      .update(rawBody)
      .digest("hex");

    const digestBuffer = Buffer.from(hmac, "utf8");
    const signatureBuffer = Buffer.from(signatureHeader, "utf8");

    if (!crypto.timingSafeEqual(digestBuffer, signatureBuffer)) {
      console.log("Signature mismatch");
      return new Response("Invalid signature", { status: 401 });
    }

    const event = JSON.parse(rawBody);
    const { custom_data } = event.meta ?? {};
    const userId = custom_data?.user_id;

    if (!userId) {
      return new Response("User ID not found in custom data", { status: 400 });
    }

    const user = await client.user.update({
      where: { id: userId },
      data: { subscription: true },
    });

    return Response.json({ status: 200, data: user });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Webhook error", { status: 500 });
  }
}
