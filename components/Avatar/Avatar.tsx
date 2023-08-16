'use client'

import Image from 'next/image'
import { FC, HTMLAttributes } from 'react'

type AvatarProps = HTMLAttributes<HTMLDivElement> & { imageUrl: string | null | undefined }

const Avatar: FC<AvatarProps> = (props) => {
  const { imageUrl, ...otherProps } = props

  return (
    <div className='relative h-9 w-9 md:h-11 md:w-11' {...otherProps}>
      <div
        className='
    relative
    inline-block
    rounded-full
    overflow-hidden
    h-9 w-9 md:h-11 md:w-11
'
      >
        <Image alt='User placeholder' src={imageUrl ?? '/images/UserPlaceholder.svg'} fill />
      </div>
      <div className='absolute rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2'></div>
    </div>
  )
}

export default Avatar
