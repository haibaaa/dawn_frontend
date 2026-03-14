import { NextRequest, NextResponse } from "next/server";

const BACKEND = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
const SIGNUP_PATH = process.env.NEXT_PUBLIC_SIGNUP_PATH || "/auth/signup";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(`${BACKEND}${SIGNUP_PATH.startsWith("/") ? SIGNUP_PATH : `/${SIGNUP_PATH}`}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    return NextResponse.json(
      { detail: (e as Error).message || "Proxy error" },
      { status: 500 }
    );
  }
}
