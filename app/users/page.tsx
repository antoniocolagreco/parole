import { FC, HTMLAttributes } from 'react'
import EmptyState from '../../components/EmptyState'

type UsersPageProps = HTMLAttributes<HTMLDivElement> & { searchParams: {} }

const UsersPage: FC<UsersPageProps> = (props) => {
  const { searchParams, ...otherProps } = props
  return (
    <div className='hidden lg:block lg:pl-80 h-full' {...otherProps}>
      <EmptyState />
    </div>
  )
}

export default UsersPage
