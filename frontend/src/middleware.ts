import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "./helper/validateToken";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";
  const loginPath = "/login";

  console.log("Request URL:", request.nextUrl.pathname);

  if (request.nextUrl.pathname === loginPath) {
    return NextResponse.next();
  }

  if (token) {
    const isValid = await validateToken(token);
    if (isValid) {
      console.log("Valid token found, allowing request");
      return NextResponse.next();
    } else {
      console.log("Invalid token found");
    }
  } else {
    console.log("No token found");
  }

  console.log("Redirecting to login");
  const loginUrl = new URL(loginPath, request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/home", "/profile","/settings"],
};