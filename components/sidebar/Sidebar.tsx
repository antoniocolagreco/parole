import { getCurrentUser } from 'helpers/helpers'
import { FC, HTMLAttributes } from 'react'
import DesktopSidebar from './DesktopSidebar'
import MobileFooter from './MobileFooter'

type SidebarProps = HTMLAttributes<HTMLDivElement> & {}

const Sidebar: FC<SidebarProps> = async (props) => {
  const { children, ...otherProps } = props

  const currentUser = await getCurrentUser()

  return (
    <div className='h-full' {...otherProps}>
      <DesktopSidebar currentUser={currentUser} />
      <MobileFooter />
      <main className='lg:pl-20 h-full'>{children}</main>
    </div>
  )
}

export default Sidebar
