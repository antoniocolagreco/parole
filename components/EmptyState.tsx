import { default as dictionary } from '@languages/en.json'
import { FC, HTMLAttributes } from 'react'

type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {}

const EmptyState: FC<EmptyStateProps> = (props) => {
  const { ...otherProps } = props
  return (
    <div className='px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-gray-100' {...otherProps}>
      <div className='text-center items-center flex flex-col'>
        <h3 className='m2-2 text-2xl font-semibold text-gray-900'>
          {dictionary.select_a_chat_or_start_a_new_conversation}
        </h3>
      </div>
    </div>
  )
}

export default EmptyState
