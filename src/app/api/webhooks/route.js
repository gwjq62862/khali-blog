import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  // If missing secret
  if (!WEBHOOK_SECRET) {
    console.error("❌ Missing CLERK_WEBHOOK_SIGNING_SECRET");
    return new NextResponse("Missing Clerk Webhook Signing Secret", { status: 500 });
  }

  const payload = await req.text(); // IMPORTANT: req.text(), NOT req.json()
  const headerPayload = headers();

  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    console.error("❌ Missing Svix headers:", { svixId, svixTimestamp, svixSignature });
    return new NextResponse("Missing Svix headers", { status: 400 });
  }

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    // Verify the request
    evt = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
    console.log("✅ Webhook verified:", evt.type);
  } catch (err) {
    console.error("❌ Error verifying webhook:", err);
    return new NextResponse("Error verifying webhook", { status: 400 });
  }

  // Example: handle events
  if (evt.type === "user.created") {
    console.log("New user created:", evt.data.id);
  }

  return NextResponse.json({ success: true });
}
