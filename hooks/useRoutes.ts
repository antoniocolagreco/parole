import { default as dictionary } from '@languages/en.json'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { IconType } from 'react-icons'
import { HiChat, HiUsers } from 'react-icons/hi'
import { HiArrowLeftOnRectangle } from 'react-icons/hi2'
import useConversation from './useConversation'

export type RouteItem = {
  label: string
  href?: string
  icon: IconType
  active?: boolean
  onClick?: () => void
}

const useRoutes = () => {
  const pathname = usePathname()
  const { conversationId } = useConversation()

  const routes = useMemo<RouteItem[]>(
    () => [
      {
        label: dictionary.chat,
        href: '/conversations',
        icon: HiChat,
        active: pathname === '/conversations' || Boolean(conversationId),
      },
      {
        label: dictionary.users,
        href: '/users',
        icon: HiUsers,
        active: pathname === '/users',
      },
      {
        label: dictionary.logout,
        icon: HiArrowLeftOnRectangle,
        onClick: () => signOut(),
      },
    ],
    [pathname, conversationId]
  )
  return routes
}

export default useRoutes
