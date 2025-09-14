import { createOrUpdateUser, delteUser } from "@/app/lib/actions/user";
import { clerkClient } from "@clerk/nextjs/server";
import { Webhook } from "svix";

// Clerk webhook handler
export async function POST(req) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error(" Missing Clerk Webhook Secret!");
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

    if (event.type === "user.created" || event.type === "user.updated") {
      const { id, first_name, last_name, email_addresses, image_url, username } = event.data;

      try {
        const user = await createOrUpdateUser(
          id,
          first_name,
          last_name,
          email_addresses,
          image_url,
          username
        );
        if (user && event.type === "user.created") {
          try {
            await clerkClient.users.updateMetadata(id, {
              publicMetadata: {
                userMongoId: user._id,
                isAdmin: user.isAdmin
              }
            });
          } catch (error) {
            console.log("Error updating Clerk user metadata:", error);
            return new Response(JSON.stringify({ error: "Failed to update user metadata" }), { status: 400 });
          }
        }
        console.log("User created/updated:", user);
      } catch (error) {
        console.log("Error in createOrUpdateUser:", error);
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error verifying webhook:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
  if(event.type==="user.deleted"){
    const {id}=event.data;
    try {
      await delteUser(id);
    } catch (error) {
      console.log("error in delete user",error)
      return new Response(JSON.stringify({ error: "Failed to delete user" }), { status: 400 });
    }
  }
  return new Response("OK", { status: 200 });
}






