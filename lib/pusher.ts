// lib/pusher.ts
import PusherServer from "pusher";
import PusherClient from "pusher-js";

const appId = process.env.PUSHER_APP_ID!;
const key = process.env.PUSHER_KEY!;
const secret = process.env.PUSHER_SECRET!;
const cluster = process.env.PUSHER_CLUSTER!;

if (!appId || !key || !secret || !cluster) {
  console.warn("[PUSHER] Missing env vars. Realtime chat will not work until set.");
}

export const pusherServer = new PusherServer({
  appId,
  key,
  secret,
  cluster,
  useTLS: true
});

// Client factory for Next.js client components
export function createPusherClient() {
  if (typeof window === "undefined") return null;

  const clientKey = process.env.NEXT_PUBLIC_PUSHER_KEY!;
  const clientCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER!;

  return new PusherClient(clientKey, {
    cluster: clientCluster,
    forceTLS: true
  });
}
