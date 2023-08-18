import { User } from '@prisma/client'
import Sidebar from '../../components/sidebar/Sidebar'
import UserList from '../../components/userList/UserList'
import { getUsers } from '../../helpers/helpers'

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  const users: User[] = await getUsers()

  return (
    <Sidebar>
      <UserList users={users} />
      <div className='h-full lg:pl-80'>{children}</div>
    </Sidebar>
  )
}
