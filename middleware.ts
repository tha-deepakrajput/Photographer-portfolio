import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  // Try to update the session (refresh expiry) if it exists
  const res = await updateSession(request);

  // Protect /admin routes (except /admin/login)
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
    const session = request.cookies.get("admin_session")?.value;
    
    // If no session exists, redirect straight to login
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return res || NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
