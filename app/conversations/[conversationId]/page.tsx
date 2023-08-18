import EmptyState from '@components/EmptyState'
import ConversationBody from '@components/conversationBody/ConversationBody'
import ConversationHeader from '@components/conversationHeader/ConversationHeader'
import { getConversationbyId, getMessagesbyConversationId } from '@helpers/helpers'
import { FC, HTMLAttributes } from 'react'
import ConversationForm from '../../../components/conversationForm/ConversationForm'

type ConversationIdPageProps = HTMLAttributes<HTMLDivElement> & { params: { conversationId: string }; searchParams: {} }

const ConversationIdPage: FC<ConversationIdPageProps> = async (props) => {
  const {
    params: { conversationId },
    searchParams,
    ...otherProps
  } = props

  const conversation = await getConversationbyId(conversationId)

  if (!conversation) return <EmptyState />

  const messages = await getMessagesbyConversationId(conversationId)

  return (
    <div className='h-full flex flex-col' {...otherProps}>
      <ConversationHeader conversation={conversation} />
      <ConversationBody initialMessages={messages} />
      <ConversationForm />
    </div>
  )
}

export default ConversationIdPage
