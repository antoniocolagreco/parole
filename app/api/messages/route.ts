import { getCurrentUser } from '@helpers/helpers'
import prisma from '@libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'

type MessageRequestData = {
  message: string
  image: string
  conversationId: string
}

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    const body = await (request.json() as Promise<MessageRequestData>)
    const { conversationId, image, message } = body

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image,
        conversation: { connect: { id: conversationId } },
        user: { connect: { id: currentUser.id } },
        seen: { connect: { id: currentUser.id } },
      },
      include: { user: true, seen: true },
    })

    const updatedConversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: new Date(), messages: { connect: { id: newMessage.id } } },
      include: { users: true, messages: { include: { seen: true } } },
    })

    return NextResponse.json(newMessage)
  } catch (error: any) {
    console.error(error, 'ERROR_MESSAGE')
    return new NextResponse('InternalError', { status: 500 })
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
