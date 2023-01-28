import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

// export const config = {
//   runtime: "edge",
// };

export default async function (req, res) {
  try {
    const descriptions = await get("descriptions");
    const intro = await get("intro");
    return res.status(200).json({ descriptions, intro });
  } catch (err) {
    return res.status.json({ message: err.message });
  }
}

// export default async function () {
//   const descriptions = await get("descriptions");
//   const intro = await get("intro");

//   const body = {
//     descriptions,
//     intro,
//   };

//   return NextResponse.json({ descriptions, intro });
// }
