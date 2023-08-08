'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'
import { RouteItem } from '../../hooks/useRoutes'

type MobileItemProps = HTMLAttributes<HTMLDivElement> & RouteItem & {}

const MobileItem: FC<MobileItemProps> = (props) => {
  const { href, icon: Icon, label, onClick, active, ...otherProps } = props

  const content = (
    <>
      <Icon className='h-6 w-6 shrink-0' />
      <span className='sr-only'>{label}</span>
    </>
  )

  return (
    <div className='w-full' {...otherProps}>
      {href ? (
        <Link
          href={href}
          className={clsx(
            `
            transition
        group
        flex
        gap-x-3
        text-sm
        leading-6
        font-semibold
        w-full
        justify-center
        p-4 
        text-gray-500
        hover:text-black
        hover:bg-gray-100
        `,
            active && 'bg-gray-100 text-black'
          )}
        >
          {content}
        </Link>
      ) : (
        <button
          className={clsx(
            `
            transition
            w-full
            group
            flex
            gap-x-3
            text-sm
            leading-6
            font-semibold
            justify-center
            p-4 
            text-gray-500
            hover:text-black
            hover:bg-gray-100
      `,
            active && 'bg-gray-100 text-black'
          )}
          {...(onClick ? { onClick } : {})}
        >
          {content}
        </button>
      )}
    </div>
  )
}

export default MobileItem
