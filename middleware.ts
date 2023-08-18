// This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request })

import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })

  const url = request.nextUrl
  if (token) {
    if (url.pathname === '/') {
      return NextResponse.redirect(new URL('/users', request.url))
    }
  }

  if (!token) {
    if (url.pathname.startsWith('/users') || url.pathname.startsWith('/conversations')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}
