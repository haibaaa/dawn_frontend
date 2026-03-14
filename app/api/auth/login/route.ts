import { NextRequest, NextResponse } from "next/server";

const BACKEND = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
const LOGIN_PATH = process.env.NEXT_PUBLIC_LOGIN_PATH || "/auth/login";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(`${BACKEND}${LOGIN_PATH.startsWith("/") ? LOGIN_PATH : `/${LOGIN_PATH}`}`, {
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
