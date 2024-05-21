import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/me', '/profile']
const loggedInPaths = ['/login', '/register']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const sessionToken = request.cookies.get('sessionToken')?.value

  if (privatePaths.some((privatePath) => pathname.startsWith(privatePath) && !sessionToken)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (loggedInPaths.some((loggedInPath) => pathname.startsWith(loggedInPath) && sessionToken)) {
    return NextResponse.redirect(new URL('/me', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/me', '/profile', '/login', '/register'],
}
