import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

// export const config = {
//   runtime: "edge",
// };

export default async function (req, res) {
  // const images = await get("images");
  try {
    const images = await get("images");
    return res.json(images);
  } catch (err) {
    return res.json({ message: err.message });
  }

  // return NextResponse.json(images);
}
