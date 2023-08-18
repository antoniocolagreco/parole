'use client'

import { default as dictionary } from '@languages/en.json'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { FC, HTMLAttributes } from 'react'
import { Message } from '../../types/models'
import Avatar from '../avatar/Avatar'

type MessageBoxProps = HTMLAttributes<HTMLDivElement> & { data: Message; isLast?: boolean }

const MessageBox: FC<MessageBoxProps> = (props) => {
  const { children, className = '', data, isLast, ...otherProps } = props
  const session = useSession()
  const { format } = new Intl.DateTimeFormat('it', {
    dateStyle: 'short',
  })

  const isOwn = session.data?.user?.email === data.user.email
  const seenList = (data.seen ?? [])
    .filter((user) => user.email !== session.data?.user?.email)
    .map((user) => user.name)
    .join(', ')

  return (
    <div className={clsx('flex gap-3 p-4', isOwn && 'justify-end', className)} {...otherProps}>
      <div className={clsx(isOwn && 'order-2')}>
        <Avatar imageUrl={data.user.image} />
      </div>
      <div className={clsx('flex flex-col gap-2', isOwn && 'items-end')}>
        <div className='flex items-center gap-1'>
          <div className='text-sm font-semibold text-gray-500'>{data.user.name}</div>
          <div className='text-xs text-gray-400'>{format(new Date(data.createdAt))}</div>
        </div>
        <div
          className={clsx(
            'text-sm w-fit overflow-hidden',
            isOwn ? 'bg-violet-500 text-white' : 'bg-gray-100',
            data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
          )}
        >
          {data.image ? (
            <Image
              alt={dictionary.avatar}
              src={data.image}
              height={288}
              width={288}
              className='bg-white object-cover cursor-pointer'
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageBox
