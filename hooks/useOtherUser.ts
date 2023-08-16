import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { Conversation } from '../types/models'

const useOtherUser = (conversation: Conversation) => {
  const session = useSession()

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email
    return conversation.users.find((user) => user.email !== currentUserEmail)
  }, [session.data?.user?.email, conversation.users])

  return otherUser
}

export default useOtherUser
