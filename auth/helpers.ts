import { Session, getServerSession } from 'next-auth'
import authOptions from './authOptions'

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

    return currentUser
  } catch (error: any) {
    return null
  }
}
