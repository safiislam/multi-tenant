import { rootDomain } from "@/lib/utils";
import { NextResponse } from "next/server";

function extractSubdomain(request) {
  const url = request.url;
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];

  // Local dev (e.g., safi.localhost:3000)
  if (url.includes("localhost") || url.includes("127.0.0.1")) {
    const match = url.match(/https?:\/\/([^.]+)\.localhost/);
    return match?.[1] ?? null;
  }

  // Production (e.g., safi.tenant-next-app.vercel.app)
  const root = rootDomain.replace(/^www\./, "");
  if (hostname !== root && hostname.endsWith(`.${root}`)) {
    return hostname.replace(`.${root}`, "");
  }

  return null;
}

export async function middleware(request) {
  const { pathname } = new URL(request.url);
  const subdomain = extractSubdomain(request);

  if (subdomain) {
    // Prevent /admin access from subdomains
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Rewrite homepage to tenant page
    if (pathname === "/") {
      return NextResponse.rewrite(new URL(`/s/${subdomain}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|[\\w-]+\\.\\w+).*)"],
};
