import { FC, HTMLAttributes, InputHTMLAttributes } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

type MessageInputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  containerClassName?: HTMLAttributes<HTMLDivElement>
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}

const MessageInput: FC<MessageInputProps> = (props) => {
  const { children, className = "", required, containerClassName = '', register, errors, id, ...otherProps } = props
  return (
    <div className={`relative w-full ${containerClassName}`}>
      <input
        id={id}
        className={`w-full text-black font-light py-2 px-4 bg-neutral-100 rounded-full focus:outline-none ${className}`}
        {...register(id, { required })}
        {...otherProps}
      />
    </div>
  )
}

export default MessageInput
