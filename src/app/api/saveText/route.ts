import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(req: Request) {
  const { text } = await req.json();
  const id = new URL(req.url).searchParams.get("id");

  if (!id || !text) {
    return NextResponse.json(
      { error: "ID and text are required" },
      { status: 400 }
    );
  }

  await redis.set(id, text, { ex: 86400 });

  return NextResponse.json({ success: true, id });
}
