import prisma from '@libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '../../../helpers/helpers'

export type Conversation = {
  userId: string
  isGroup: boolean
  members: { value: string }[]
  name: string
}

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    const body: Conversation = await request.json()
    const { isGroup, members, name, userId } = body

    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse('Unathorized', { status: 401 })
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse('Invalid data', { status: 400 })
    }

    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [...members.map((member: { value: string }) => ({ id: member.value })), { id: currentUser.id }],
          },
        },
        include: { users: true },
      })

      return NextResponse.json(newConversation)
    }

    const existingConversation = await prisma.conversation.findFirst({
      where: {
        userIds: { hasEvery: [currentUser.id, userId] },
      },
    })

    const singleConversation = existingConversation

    if (singleConversation) {
      return NextResponse.json(singleConversation)
    }

    const newCoversation = await prisma.conversation.create({
      data: {
        users: { connect: [{ id: currentUser.id }, { id: userId }] },
      },
      include: { users: true },
    })

    return NextResponse.json(newCoversation)
  } catch (error: any) {
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return new NextResponse('Method Not Allowed', { status: 405 })
}

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
