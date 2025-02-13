import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const text = await redis.get(id);
  return NextResponse.json({ text });
}
