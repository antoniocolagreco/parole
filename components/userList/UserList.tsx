import { User } from '@prisma/client'
import { FC, HTMLAttributes } from 'react'
import UserBox from '../userBox/UserBox'

type UserListProps = HTMLAttributes<HTMLDivElement> & { users: User[] }

const UserList: FC<UserListProps> = (props) => {
  const { users, ...otherProps } = props
  return (
    <aside
      className='fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-r-gray-200 block w-full left-0'
      {...otherProps}
    >
      <div className='px-5'>
        <div className='flex flex-col'>
          <div className='text-2xl font-bold text-neutral-800 py-4'>People</div>
        </div>
        {users.map((user) => (
          <UserBox key={user.id} userData={user} />
        ))}
      </div>
    </aside>
  )
}

export default UserList
