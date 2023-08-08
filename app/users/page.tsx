'use client'
import { signOut } from 'next-auth/react'
import { FC, HTMLAttributes } from 'react'

type UsersPageProps = HTMLAttributes<HTMLDivElement> & { searchParams: {} }

const UsersPage: FC<UsersPageProps> = (props) => {
  const { searchParams, ...otherProps } = props
  return (
    <div {...otherProps}>
      UsersPage
      <button onClick={() => signOut()}>Logout</button>
    </div>
  )
}

export default UsersPage
