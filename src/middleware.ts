import { findOneRedirectUrl } from "config/general";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const token = req.cookies.get("admin_access_token")?.value || req.cookies.get("super_admin_access_token")?.value;
    const pathname = req.nextUrl.pathname;

   const redirectUrls = await findOneRedirectUrl(pathname.replace(/^\/+|\/+$/g, ''))

    if (redirectUrls) {
      return NextResponse.redirect(new URL(`/${redirectUrls?.redirectedUrl}`, req.url), 301);
    }

    const isAuthRoute = pathname === "/dashboard/Admin-login";
    const isProtectedRoute = pathname.startsWith("/dashboard") && !isAuthRoute;

    console.log(isProtectedRoute,"isAuthRoute", isAuthRoute)
    if (token && isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!token && isProtectedRoute) {
      return NextResponse.redirect(new URL("/dashboard/Admin-login", req.url));
    }

    return NextResponse.next();


  } catch (error) {
    throw error;

  }

}

export const config = {
  matcher: [
    '/((?!api|_next|.*\\.).+)',
  ],
};
