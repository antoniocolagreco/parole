'use client'

import { User } from '@prisma/client'
import Image from 'next/image'
import { FC, HTMLAttributes } from 'react'

type AvatarProps = HTMLAttributes<HTMLDivElement> & { currentUser: User | null }

const Avatar: FC<AvatarProps> = (props) => {
  const { currentUser, ...otherProps } = props
  return (
    <div className='relative' {...otherProps}>
      <div
        className='
    relative
    inline-block
    rounded-full
    overflow-hidden
    h-9
    w-9
    md:h-11
    md:w-11'
      >
        <Image alt='User placeholder' src={currentUser?.image ?? '/images/UserPlaceholder.svg'} fill />
      </div>
      <span className='absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2'></span>
    </div>
  )
}

export default Avatar
