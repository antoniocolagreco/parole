'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { FC, LiHTMLAttributes } from 'react'
import { RouteItem } from '../../hooks/useRoutes'

type DesktopItemProps = LiHTMLAttributes<HTMLLIElement> & RouteItem & {}

const DesktopItem: FC<DesktopItemProps> = (props) => {
  const { href, icon: Icon, label, onClick, active, ...otherProps } = props

  const content = (
    <>
      <Icon className='h-6 w-6 shrink-0' />
      <span className='sr-only'>{label}</span>
    </>
  )

  return (
    <li {...otherProps}>
      {href ? (
        <Link
          href={href}
          className={clsx(
            `
        group
        flex
        gap-x-3
        rounded-md
        p-3
        text-sm
        leading-6
        font-semibold
        text-gray-500
        hover:text-violet-600
        hover:bg-violet-100
        `,
            active && 'bg-gray-100 text-violet-500'
          )}
        >
          {content}
        </Link>
      ) : (
        <button
          className={clsx(
            `
      group
      flex
      gap-x-3
      rounded-md
      p-3
      text-sm
      leading-6
      font-semibold
      text-gray-500
      hover:text-violet-600
      hover:bg-violet-100
      `,
            active && 'bg-gray-100 text-violet-500'
          )}
          {...(onClick ? { onClick } : {})}
        >
          {content}
        </button>
      )}
    </li>
  )
}

export default DesktopItem
