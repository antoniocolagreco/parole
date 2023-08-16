'use client'

import { default as dictionary } from '@languages/en.json'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { FC, HTMLAttributes, useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'
import useConversation from '../../hooks/useConversation'
import { Conversation } from '../../types/models'
import ConversationBox from '../conversationBox/ConversationBox'

type ConversationListProps = HTMLAttributes<HTMLElement> & { initialConversations: Conversation[] }

const ConversationList: FC<ConversationListProps> = (props) => {
  const { initialConversations, ...otherProps } = props
  const [conversations, setConversations] = useState(initialConversations)
  const router = useRouter()
  const { conversationId, isOpen } = useConversation()

  return (
    <aside
      className={clsx(
        'fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-r-gray-200 block w-full left-0',
        isOpen ? 'hidden' : 'block w-full left-0'
      )}
      {...otherProps}
    >
      <div className='px-5'>
        <div className='flex justify-between items-center'>
          <div className='text-2xl font-bold text-neutral-800 py-4'>{dictionary.messages}</div>
          <div className='rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition'>
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {conversations.map((conversation) => (
          <ConversationBox
            key={conversation.id}
            conversation={conversation}
            selected={conversationId === conversation.id}
          />
        ))}
      </div>
    </aside>
  )
}

export default ConversationList
