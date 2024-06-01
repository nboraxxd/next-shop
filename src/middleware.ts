import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const loggedInPaths = ['/me', '/me/update', '/profile', '/products/add']
const loggedOutPaths = ['/login', '/register']
const editProductRegex = /^\/products\/edit\/[^/]+$/

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const sessionToken = request.cookies.get('sessionToken')?.value

  if (
    (editProductRegex.test(pathname) || loggedInPaths.some((privatePath) => pathname.startsWith(privatePath))) &&
    !sessionToken
  ) {
    console.log('🔥 ~ middleware ~ pathname:', pathname)
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname)

    return NextResponse.redirect(loginUrl)
  }

  if (loggedOutPaths.some((loggedInPath) => pathname.startsWith(loggedInPath) && sessionToken)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/me', '/me/update', '/profile', '/login', '/register', '/products/add', '/products/edit/:path*'],
}
