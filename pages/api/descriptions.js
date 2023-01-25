import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export const config = {
  runtime: "edge",
  matcher: "/past",
};

export default async function () {
  const descriptions = await get("descriptions");

  return NextResponse.json(descriptions);
}
