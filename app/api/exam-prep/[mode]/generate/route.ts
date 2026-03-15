import { NextRequest, NextResponse } from "next/server";

const BACKEND = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ mode: string }> }
) {
  try {
    const { mode } = await params;
    if (mode !== "flashcards" && mode !== "quiz") {
      return NextResponse.json(
        { detail: "Invalid mode. Use 'flashcards' or 'quiz'" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const authHeader = request.headers.get("authorization");

    const backendFormData = new FormData();
    const file = formData.get("file");
    if (file && file instanceof Blob) {
      backendFormData.append("file", file);
    }

    const headers: HeadersInit = {};
    if (authHeader) headers["Authorization"] = authHeader;

    const res = await fetch(`${BACKEND}/${mode}/generate`, {
      method: "POST",
      headers,
      body: backendFormData,
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
