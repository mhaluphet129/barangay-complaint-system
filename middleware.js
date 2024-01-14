import { NextRequest, NextResponse } from "next/server";

export async function middleware(req = NextRequest) {
  const url = req.nextUrl.clone();
  const validPath = ["/", "/user/login", "/user/home"];
  const validComplainPath = ["/file-complaint", "/file-complain", "/complain"];

  if (validComplainPath.includes(url.pathname)) {
    url.pathname = "user/complaint";
    return NextResponse.rewrite(url);
  }

  if (validPath.includes(url.pathname)) {
    const isLoggedIn = req.cookies.get("loggedIn") || false;
    url.pathname = isLoggedIn ? "user/home" : "user/login";
    return NextResponse.rewrite(url);
  }
}
