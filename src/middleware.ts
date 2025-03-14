import { getAdminData } from "components/serverActions/fetch";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const token = req.cookies.get("admin_access_token")?.value || req.cookies.get("super_admin_access_token")?.value;
    const pathname = req.nextUrl.pathname;
  
    const isAuthRoute = pathname === "/dashboard/Admin-login";
    const isProtectedRoute = pathname.startsWith("/dashboard") && !isAuthRoute; // All dashboard routes except login
  
    if (token && isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  
    if (!token && isProtectedRoute) {
      return NextResponse.redirect(new URL("/dashboard/Admin-login", req.url));
    }
  
    const admin = await getAdminData(token)
  console.log(admin, "admin")
    return NextResponse.next();


  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL("/dashboard/Admin-login", req.url));

  }

}

export const config = {
  matcher: ["/dashboard/:path*"],
};
