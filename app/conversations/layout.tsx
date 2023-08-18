import Sidebar from '@components/sidebar/Sidebar'
import { getConversations } from 'helpers/helpers'
import ConversationList from '../../components/conversationList/ConversationList'
import { Conversation } from '../../types/models'

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  const conversations: Conversation[] = await getConversations()

  return (
    <Sidebar>
      <ConversationList initialConversations={conversations} />
      <div className='h-full lg:pl-80'>{children}</div>
    </Sidebar>
  )
}
