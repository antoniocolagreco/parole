'use client'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC, HTMLAttributes, useCallback, useState } from 'react'
import Avatar from '../avatar/Avatar'

type UserBoxProps = HTMLAttributes<HTMLDivElement> & { userData: User }

const UserBox: FC<UserBoxProps> = (props) => {
  const { userData, ...otherProps } = props
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(() => {
    setIsLoading(true)

    axios
      .post('/api/conversations', {
        userId: userData.id,
      })
      .then((response) => {
        router.push(`/conversations/${response.data.id}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [userData, router])

  return (
    <div
      onClick={handleClick}
      className='w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer'
      {...otherProps}
    >
      <Avatar imageUrl={userData.image} />
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <div className='flex justify-between items-center mb-1'>
            <p className='text-md font-semibold text-gray-900'>{userData.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserBox
