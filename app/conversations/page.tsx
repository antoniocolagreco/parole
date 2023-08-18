'use client'
import clsx from 'clsx'
import { FC, HTMLAttributes } from 'react'
import EmptyState from '../../components/EmptyState'
import useConversation from '../../hooks/useConversation'

type ConversationsPageProps = HTMLAttributes<HTMLDivElement> & { searchParams: {} }

const ConversationsPage: FC<ConversationsPageProps> = (props) => {
  const { searchParams, ...otherProps } = props
  const { isOpen } = useConversation()

  return (
    <div className={clsx('h-full lg:block', isOpen ? 'block' : 'hidden')} {...otherProps}>
      <EmptyState />
    </div>
  )
}

export default ConversationsPage
