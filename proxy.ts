import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const protectedPaths = ["/admin", "/dashboard"];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path (without locale) is protected
  const isProtected = protectedPaths.some((p) =>
    pathname.replace(/^\/(fr|ar)/, "").startsWith(p)
  );

  if (isProtected) {
    const token = request.cookies.get("better-auth.session_token");
    if (!token) {
      const locale = pathname.startsWith("/ar") ? "ar" : "fr";
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
