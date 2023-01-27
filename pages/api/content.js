import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export const config = {
  runtime: "edge",
};

export default async function () {
  const descriptions = await get("descriptions");
  const intro = await get("intro");

  const body = {
    descriptions,
    intro,
  };

  return NextResponse.json({ descriptions, intro });
}

// export default async function handler(req) {
//   return new Response()
// }
