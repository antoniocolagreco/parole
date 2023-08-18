'use client'

import { default as dictionary } from '@languages/en.json'
import axios from 'axios'
import { CldUploadButton } from 'next-cloudinary'
import { FC, FormHTMLAttributes, HTMLAttributes } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2'
import useConversation from '../../hooks/useConversation'
import { CloudinaryUploadResult } from '../../types/cloudinary'
import MessageInput from '../messageInput/MessageInput'

type ConversationFormProps = FormHTMLAttributes<HTMLFormElement> & {
  containerClassName?: HTMLAttributes<HTMLDivElement>
}

const ConversationForm: FC<ConversationFormProps> = (props) => {
  const { children, containerClassName = '', className = '', ...otherProps } = props

  const { conversationId } = useConversation()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({})

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true })
    axios.post('/api/messages', { ...data, conversationId })
  }

  const handleImageUpload = (result: CloudinaryUploadResult) => {
    if (result.info && typeof result.info !== 'string' && 'secure_url' in result.info) {
      axios.post('/api/messages', { image: result.info.secure_url, conversationId })
    }
  }

  return (
    <div className={`p-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full ${containerClassName}`}>
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleImageUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
      >
        <HiPhoto size={32} className='text-violet-500' />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex items-center gap-2 lg:gap-4 w-full ${className}`}
        {...otherProps}
      >
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          required
          placeholder={dictionary.write_a_message}
          autoComplete='off'
        />
        <button className='rounded-full p-2 bg-violet-500 cursor-pointer hover:bg-violet-600 transition'>
          <HiPaperAirplane size={18} className='text-white' />
        </button>
      </form>
    </div>
  )
}

export default ConversationForm
