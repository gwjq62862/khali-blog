import { headers } from "next/headers";
import { Webhook } from "svix";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("📥 Webhook received");

  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      console.error("❌ Missing CLERK_WEBHOOK_SECRET");
      return new NextResponse("Missing Clerk Webhook Secret", { status: 500 });
    }

    const payload = await req.text();
    console.log("Payload received:", payload);

    const headerPayload = headers();
    const svixId = headerPayload.get("svix-id");
    const svixTimestamp = headerPayload.get("svix-timestamp");
    const svixSignature = headerPayload.get("svix-signature");

    console.log("Headers:", { svixId, svixTimestamp, svixSignature });

    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error("❌ Missing one of the Svix headers");
      return new NextResponse("Missing Svix headers", { status: 400 });
    }

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;
    try {
      evt = wh.verify(payload, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      });
      console.log("✅ Signature verified:", evt.type);
    } catch (err) {
      console.error("❌ Signature verification failed:", err);
      return new NextResponse("Invalid signature", { status: 400 });
    }

    console.log("Event type:", evt.type);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
