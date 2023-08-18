'use client'

import useConversation from '@hooks/useConversation'
import axios, { AxiosError } from 'axios'
import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react'
import { Message } from '../../types/models'
import MessageBox from '../messageBox/MessageBox'

type ConversationBodyProps = HTMLAttributes<HTMLDivElement> & { initialMessages: Message[] }

const ConversationBody: FC<ConversationBodyProps> = (props) => {
  const { children, initialMessages, className = '', ...otherProps } = props
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { conversationId } = useConversation()

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`).catch((e: AxiosError) => {
      console.error(`${e.response?.status} - ${e.response?.statusText}`)
    })
  }, [conversationId])

  return (
    <div className={`flex-1 overflow-y-auto p-4 ${className}`} {...otherProps}>
      {messages.map((message, index) => (
        <MessageBox key={message.id} data={message} isLast={index === messages.length} />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

export default ConversationBody
