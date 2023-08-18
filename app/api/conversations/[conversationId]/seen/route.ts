import { getCurrentUser } from '@helpers/helpers'
import prisma from '@libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'

type SeenParams = {
  conversationId: string
}

export async function POST(request: NextRequest, { params: { conversationId } }: { params: SeenParams }) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    })

    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 })
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1]

    if (!lastMessage) {
      return NextResponse.json(conversation)
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        user: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    })

    return new NextResponse('Updated', { status: 200 })
  } catch (error: any) {
    console.log(error, 'ERROR_MESSAGE_SEEN')
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
