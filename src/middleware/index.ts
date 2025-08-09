import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of routes that are accessible without authentication
const publicRoutes = ["/", "/auth", "/search", "/top", "/seasonal", "/movies"];
// Routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/my-list",
  "/favorites",
  "/profile",
  "/settings",
  "/statistics",
];

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  // Check if the user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = request.nextUrl.pathname;

  // Check if the route requires authentication
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // If route requires authentication and user is not logged in, redirect to auth
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL("/auth", request.url);
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

// Configure which paths will trigger this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public images folder)
     * - public files
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|.*\\.png$|.*\\.svg$).*)",
  ],
};
