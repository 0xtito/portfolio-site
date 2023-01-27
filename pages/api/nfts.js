import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export const config = {
  runtime: "edge",
};

export default async function () {
  const descriptions = await get("nfts");

  return NextResponse.json(descriptions);
}
