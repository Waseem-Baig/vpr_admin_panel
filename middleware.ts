import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of routes that do NOT require authentication
const PUBLIC_PATHS = ["/signin", "/api", "/_next", "/favicon.ico", "/assets"];

// Use the manual cookie name set with js-cookie in your sign-in page
const ACCESS_COOKIE_NAME = "sb-access-token";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Get the user's session from cookies (manual cookie name)
  const accessToken = request.cookies.get(ACCESS_COOKIE_NAME)?.value;

  // If no session, redirect to signin
  if (!accessToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  // Check user role
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/check-role`,
    {
      headers: { Cookie: request.headers.get("cookie") || "" },
    }
  );

  let role = null;
  if (response.ok) {
    try {
      const data = await response.json();
      role = data.role;
    } catch (e) {
      role = null;
    }
  }

  if (!["admin", "staff"].includes(role)) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware to all routes except public ones
export const config = {
  matcher: [
    /*
      Match all routes except:
      - /signin
      - /api/*
      - /_next/*
      - /favicon.ico
      - /assets/*
    */
    "/((?!signin|api|_next|favicon.ico|assets).*)",
  ],
};
