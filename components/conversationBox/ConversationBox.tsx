'use client'

import { default as dictionary } from '@languages/en.json'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FC, HTMLAttributes, useCallback, useMemo } from 'react'
import useOtherUser from '../../hooks/useOtherUser'
import { Conversation, Message } from '../../types/models'
import Avatar from '../avatar/Avatar'

type ConversationBoxProps = HTMLAttributes<HTMLDivElement> & { conversation: Conversation; selected: boolean }

const ConversationBox: FC<ConversationBoxProps> = (props) => {
  const { conversation, selected, ...otherProps } = props
  const otherUser = useOtherUser(conversation)
  const session = useSession()
  const router = useRouter()
  const { format } = new Intl.DateTimeFormat('it', {
    dateStyle: 'short',
  })

  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`)
  }, [router, conversation.id])

  const lastMessage: Message | undefined = useMemo(() => {
    return conversation.messages[conversation.messages.length - 1]
  }, [conversation.messages])

  const userEmail = useMemo(() => {
    return session?.data?.user?.email
  }, [session?.data?.user?.email])

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false
    }

    const seenArray = lastMessage.seen ?? []

    if (!userEmail) {
      return false
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0
  }, [lastMessage, userEmail])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return dictionary.sent_an_image
    }
    if (lastMessage?.body) {
      return lastMessage.body
    }
    return dictionary.started_a_conversation
  }, [lastMessage])

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer`,
        selected ? 'bg-violet-100' : 'bg-white'
      )}
      {...otherProps}
    >
      <Avatar imageUrl={otherUser?.image} />
      <div className='min-w-0 w-full'>
        <div className='focus:outline-none '>
          <div className='flex justify-between items-center'>
            <p className='truncate text-md font-semibold text-gray-900'>{conversation.name ?? otherUser?.name}</p>
            {conversation.lastMessageAt && (
              <p className='text-xs text-gray-400 font-medium'>{format(new Date(conversation.lastMessageAt))}</p>
            )}
          </div>
          <p className={clsx(`truncate text-sm`, hasSeen ? 'text-gray-400' : 'text-black font-semibold')}>
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConversationBox
