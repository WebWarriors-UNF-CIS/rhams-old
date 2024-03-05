import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    /* Match all request paths except for the ones starting with:
     * - api (API routes)               * - _next/static (static files)     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)     * - users (managing users)          * - art (managing art) */ 
    '/((?!api|_next/static|_next/image|favicon.ico|users|art).*)',
  ],
}
export function middleware(req: NextRequest) {
  //logic to disallow access to update and delete routes unless role is admin
  //any route deeper than /art, /artists, /collections, /exhibitions
  if (req.nextUrl.pathname.startsWith('/art') ||
      req.nextUrl.pathname.startsWith('/artists') ||
      req.nextUrl.pathname.startsWith('/collections') ||
      req.nextUrl.pathname.startsWith('/exhibitions')) {
    //if (req.locals.user?.role !== 'admin')
    //  return NextResponse.redirect('/login');
  }
  return NextResponse.next();
}