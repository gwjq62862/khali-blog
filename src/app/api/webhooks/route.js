import { Webhook } from "svix";

// Clerk webhook handler
export async function POST(req) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("❌ Missing Clerk Webhook Secret!");
    return new Response("Missing CLERK_WEBHOOK_SIGNING_SECRET", { status: 400 });
  }

  // Get the raw body and headers
  const body = await req.text();
  const headers = Object.fromEntries(req.headers.entries());

  console.log("Incoming Headers:", headers);
  console.log("Raw Body:", body);

  try {
    // Verify Clerk's signature using svix
    const wh = new Webhook(WEBHOOK_SECRET);

    const event = wh.verify(body, {
      "svix-id": headers["svix-id"],
      "svix-timestamp": headers["svix-timestamp"],
      "svix-signature": headers["svix-signature"],
    });

    console.log("✅ Webhook Verified:", event.type);

    // Handle different webhook event types
    switch (event.type) {
      case "user.created":
        await handleUserCreated(event.data);
        break;

      case "user.updated":
        await handleUserUpdated(event.data);
        break;

      case "user.deleted":
        await handleUserDeleted(event.data);
        break;

      default:
        console.warn("⚠️ Unhandled event type:", event.type);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("❌ Error verifying webhook:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}

//
// --- Event Handlers ---
//

/**
 * When a new user signs up
 */
async function handleUserCreated(data) {
  console.log("👤 User Created:", data);

  // Example: save user to database
  // await db.user.create({
  //   id: data.id,
  //   email: data.email_addresses[0].email_address,
  //   name: `${data.first_name} ${data.last_name}`,
  // });

  console.log(`New user saved: ${data.id}`);
}

/**
 * When a user updates their profile
 */
async function handleUserUpdated(data) {
  console.log("🔄 User Updated:", data);

  // Example: update user in database
  // await db.user.update({
  //   where: { id: data.id },
  //   data: {
  //     email: data.email_addresses[0].email_address,
  //     name: `${data.first_name} ${data.last_name}`,
  //   },
  // });

  console.log(`User updated: ${data.id}`);
}

/**
 * When a user deletes their account
 */
async function handleUserDeleted(data) {
  console.log("🗑️ User Deleted:", data);

  // Example: remove user from database
  // await db.user.delete({ where: { id: data.id } });

  console.log(`User deleted: ${data.id}`);
}
