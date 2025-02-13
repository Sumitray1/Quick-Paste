import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function GET() {
  const id = nanoid(4);
  return NextResponse.json({ id });
}
