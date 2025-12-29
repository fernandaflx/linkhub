import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
//TODO: revisar para remover os comentários

const protectedRoutes = ['/dashboard', '/projects', '/settings']
const publicRoutes = ['/', '/login', '/signup']

function isProtected(pathname: string) {
  return protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )
}

function isPublic(pathname: string) {
  return publicRoutes.includes(pathname)
}

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname

  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value

  const loggedIn = !!session

  if (isProtected(path) && !loggedIn) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  if (isPublic(path) && loggedIn && path === '/') {
    const appUrl = new URL('/dashboard', req.url)
    return NextResponse.redirect(appUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/dashboard/:path*',
    '/projects/:path*',
    '/settings/:path*',
  ],
}
