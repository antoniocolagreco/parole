import prisma from '@libs/prismadb'
import { Session, getServerSession } from 'next-auth'
import authOptions from '../app/api/auth/[...nextauth]/authOptions'
import { Conversation, Message, User } from '../types/models'

export const getSession = async (): Promise<Session | null> => {
  const session = await getServerSession(authOptions)
  return session
}

export const getCurrentUser = async () => {
  try {
    const session = await getSession()
    if (!session?.user?.email) return null

    const currentUser = prisma?.user.findUnique({ where: { email: session.user.email } })
    if (!currentUser) return null

    return currentUser as unknown as User
  } catch (error: any) {
    return null
  }
}

export const getUsers = async () => {
  const session = await getSession()

  if (!session?.user?.email) {
    return []
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        NOT: { email: session.user.email },
      },
    })
    return users as unknown as User[]
  } catch (error: any) {
    return []
  }
}

export const getConversations = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return []

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: { lastMessageAt: 'desc' },
      where: { userIds: { has: currentUser.id } },
      include: { messages: { orderBy: { createdAt: 'asc' }, include: { user: true, seen: true } }, users: true },
    })

    return conversations as unknown as Conversation[]
  } catch (error: any) {
    return []
  }
}

export const getConversationbyId = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return null
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { users: true },
    })
    return conversation as unknown as Conversation
  } catch (error: any) {
    return null
  }
}

export const getMessagesbyConversationId = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return []
    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: {
        user: true,
        seen: true,
      },
      orderBy: { createdAt: 'asc' },
    })
    return messages as unknown as Message[]
  } catch (error: any) {
    return []
  }
}
