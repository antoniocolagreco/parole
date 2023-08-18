import prisma from '@libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'
import { hashPassword } from '../../../helpers/passwordHashing'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, password } = body

    if (!email || !name || !password) {
      return new NextResponse('Missing email, name or password', { status: 400 })
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma?.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    const err = error as Error
    if (err.message.includes('User_email_key')) {
      return new NextResponse('The email address is already registered', { status: 400 })
    }
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return new NextResponse('Method Not Allowed', { status: 405 })
}
