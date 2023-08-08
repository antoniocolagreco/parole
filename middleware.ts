import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })

  const url = request.nextUrl.clone()

  if (url.pathname === '/users') {
    if (!token) return NextResponse.redirect(new URL('/', request.url))
  }

  if (url.pathname === '/') {
    if (token) return NextResponse.redirect(new URL('/users', request.url))
  }

  return NextResponse.next()
}

// export default withAuth({ pages: { signIn: '/', signOut: '/', newUser: '/users' } })

// export const config = {
//   matcher: '/users/:path*',
// }

// export { default } from 'next-auth/middleware'
