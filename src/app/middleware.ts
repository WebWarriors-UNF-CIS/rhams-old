import { withAuth } from 'next-auth/middleware';
 
export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({token}) => token?.role === 'admin'
    }
  }
)
 
export const config = {
  matcher: [
    /* Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - users (managing users)
     * - art (managing art) */ 
    '/((?!api|_next/static|_next/image|favicon.ico|users|art).*)',
  ],
}