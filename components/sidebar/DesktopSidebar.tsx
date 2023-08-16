'use client'
import useRoutes from '@hooks/useRoutes'
import { User } from '@prisma/client'
import { FC, HTMLAttributes, useState } from 'react'
import Avatar from '../avatar/Avatar'
import DesktopItem from './DesktopItem'

type DesktopSidebarProps = HTMLAttributes<HTMLDivElement> & { currentUser: User | null }

const DesktopSidebar: FC<DesktopSidebarProps> = (props) => {
  const { currentUser, ...otherProps } = props
  const routes = useRoutes()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      {...otherProps}
      className='hidden
    lg:fixed
    lg:inset-y-0
    lg:left-0
    lg:z-40
    lg:w-20
    xl:px-6
    lg:overflow-y-auto
    lg:bg-white
    lg:border-r-[1px]
    lg:pb-4
    lg:flex
    lg:flex-col
    justify-between
    transition'
    >
      <nav className='mt-4 flex flex-col justify-between'>
        <ul role='list' className='flex flex-col items-center space-y-1'>
          {routes.map((route) => (
            <DesktopItem key={route.label} {...route} />
          ))}
        </ul>
      </nav>
      <nav className='mt-4 flex flex-col justify-between items-center'>
        <button onClick={() => setIsOpen(true)} className='cursor-pointer hover:opacity-75 transition'>
          <Avatar imageUrl={currentUser?.image} />
        </button>
      </nav>
    </div>
  )
}

export default DesktopSidebar
