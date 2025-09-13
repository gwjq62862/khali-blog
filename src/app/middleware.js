import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)" // ✅ Allow webhooks
]);

export default clerkMiddleware(async (auth, req) => {
  
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)" // Exclude static files and _next
  ],
};
