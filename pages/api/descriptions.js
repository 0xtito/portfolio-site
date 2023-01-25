import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
  matcher: "/",
};

export default (req) => {
  return NextResponse.json({
    name: `Hello, I am an edge function from ${req.url}`,
  });
};
