/**
 * Backend API base URL. Ensure your server at 127.0.0.1:8000 is running.
 * Login:  POST /login  with { email, password } → { token } or { access_token }
 * Signup: POST /signup (or NEXT_PUBLIC_SIGNUP_PATH) with { email, password }
 */
export const API_BASE =
  typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000")
    : process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

/** Signup path. If your backend uses /register or /auth/signup, set NEXT_PUBLIC_SIGNUP_PATH in .env.local */
export const SIGNUP_PATH = process.env.NEXT_PUBLIC_SIGNUP_PATH || "/signup";

export function apiUrl(path: string): string {
  const base = API_BASE.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
