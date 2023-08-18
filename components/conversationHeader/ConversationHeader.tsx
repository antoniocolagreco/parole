'use client'

import Link from 'next/link'
import { FC, HTMLAttributes, useMemo } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import useOtherUser from '../../hooks/useOtherUser'
import { Conversation } from '../../types/models'
import Avatar from '../avatar/Avatar'

type ConversationHeaderProps = HTMLAttributes<HTMLDivElement> & { conversation: Conversation }

const ConversationHeader: FC<ConversationHeaderProps> = (props) => {
  const { children, className = "", conversation, ...otherProps } = props

  const otherUser = useOtherUser(conversation)

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`
    }

    return 'Active'
  }, [conversation])

  return (
    <div
      className={`bg-whitet w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm ${className}`}
      {...otherProps}
    >
      <div className='flex gap-3 items-center'>
        <Link
          href='/conversations'
          className='lg:hidden block text-violet-600 hover:text-violet-700 transition cursor-pointer'
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar imageUrl={otherUser?.image} />
        <div className='flex flex-col'>
          <div>{conversation.name || otherUser?.name}</div>
          <div className='text-sm font-light text-neutral-500'>{statusText}</div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => {}}
        className='text-violet-500 cursor-pointer hover:text-violet-600 transition'
      />
    </div>
  )
}

export default ConversationHeader
