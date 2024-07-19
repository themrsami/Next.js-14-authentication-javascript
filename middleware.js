import { NextResponse } from 'next/server'
import { decrypt } from '@/app/session/Sessions'
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
const protectedRoutes = [
  '/dashboard'
];
const publicRoutes = ['/']

export default async function middleware(req) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value
  const session = cookie ? await decrypt(cookie) : null

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

// Include all routes in the middleware matcher
export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.png$).*)'],
}
