import { getConversations } from '@auth/helpers'
import Sidebar from '@components/sidebar/Sidebar'
import ConversationList from '../../components/conversationList/ConversationList'
import { Conversation } from '../../types/models'

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  const conversations: Conversation[] = await getConversations()

  return (
    <Sidebar>
      <ConversationList initialConversations={conversations} />
      <div className='h-full'>{children}</div>
    </Sidebar>
  )
}
