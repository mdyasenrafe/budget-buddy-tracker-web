import { verifyToken } from "@/utils/token";
import { JwtPayload } from "jwt-decode";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (token) {
    const user = verifyToken(token as string) as JwtPayload & {
      role?: string;
    };

    if (user) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/signin", request.url));
}

export const config = {
  matcher: [
    "/dashboard",
    "/analytics",
    "/card-management/:page*",
    "/budget-tracker/:page*",
    "/add-transaction",
  ],
};
