import { User } from '@prisma/client'
import { getUsers } from '../../auth/helpers'
import Sidebar from '../../components/sidebar/Sidebar'
import UserList from '../../components/userList/UserList'

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  const users: User[] = await getUsers()

  return (
    <Sidebar>
      <UserList users={users} />
      <div className='h-full'>{children}</div>
    </Sidebar>
  )
}
