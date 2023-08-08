'use client'

import { FC, HTMLAttributes } from 'react'
import useConversation from '../../hooks/useConversation'
import useRoutes from '../../hooks/useRoutes'
import MobileItem from './MobileItem'

type MobileFooterProps = HTMLAttributes<HTMLDivElement> & {}

const MobileFooter: FC<MobileFooterProps> = (props) => {
  const { ...otherProps } = props
  const routes = useRoutes()
  const { isOpen } = useConversation()

  if (isOpen) {
    return null
  }

  return (
    <div
      className='
  fixed
  justify-between
  w-full
  bottom-0
  z-40
  flex
  items-center
  bg-white
  border-t-[1px]
  lg:hidden'
      {...otherProps}
    >
      {routes.map((route) => (
        <MobileItem key={route.label} {...route} />
      ))}
    </div>
  )
}

export default MobileFooter
