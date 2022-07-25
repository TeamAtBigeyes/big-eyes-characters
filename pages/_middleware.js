import { NextResponse } from "next/server";

export async function middleware(req, ev) {

  if (!req.nextUrl.pathname.startsWith("/s/")) {
    console.log("returning early");
    return;
  }
  // if (req.nextUrl.pathname.startsWith("/api/get-url/")) {
  //   console.log("returning early");
  //   return;
  // }
  // if (req.nextUrl.pathname.startsWith("/api/graphql")) {
  //   console.log("returning early");
  //   return;
  // }

  const slug = req.nextUrl.pathname.split("/").pop();

  // console.log(slug);

  const data = await (
    await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
  ).json();

  if (data.url) {
    return NextResponse.redirect(data.url);
  }
}