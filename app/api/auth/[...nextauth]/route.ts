import NextAuth from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import authOptions from './authOptions'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

export async function PUT(request: NextRequest) {
  return new NextResponse('Method Not Allowed', { status: 405 })
}

export async function PATCH(request: NextRequest) {
  return new NextResponse('Method Not Allowed', { status: 405 })
}

export async function DELETE(request: NextRequest) {
  return new NextResponse('Method Not Allowed', { status: 405 })
}

export async function HEAD(request: NextRequest) {
  return new NextResponse('Method Not Allowed', { status: 405 })
}
