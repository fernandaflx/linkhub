import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
//TODO: revisar para remover os comentários

// 1. Rotas protegidas e públicas
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

  // 2. Lê o cookie de sessão (ajuste o nome se usar outro)
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value

  const loggedIn = !!session

  // 3. Se rota protegida e não logado → manda para /login
  if (isProtected(path) && !loggedIn) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('from', path) // opcional: para redirect depois
    return NextResponse.redirect(loginUrl)
  }

  // 4. Se rota pública e já logado → manda para dashboard
  if (isPublic(path) && loggedIn && path !== '/') {
    const appUrl = new URL('/dashboard', req.url)
    return NextResponse.redirect(appUrl)
  }

  // 5. Caso contrário, segue normalmente
  return NextResponse.next()
}

// 6. Rodar proxy só nas rotas que interessam
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
