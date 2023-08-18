import clsx from 'clsx'
import { FC, HTMLAttributes, InputHTMLAttributes } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

type InputProps = {
  containerClassName?: HTMLAttributes<HTMLElement>['className']
  className?: InputHTMLAttributes<HTMLInputElement>['className']
  id: HTMLAttributes<HTMLElement>['id']
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  required?: InputHTMLAttributes<HTMLInputElement>['required']
  disabled?: InputHTMLAttributes<HTMLInputElement>['disabled']
  label?: string | undefined
  register?: UseFormRegister<FieldValues>
  errors?: FieldErrors
  autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete']
}

const Input: FC<InputProps> = (props) => {
  const {
    containerClassName = '',
    className = "",
    label,
    id,
    autoComplete = id,
    type,
    required,
    register,
    errors,
    disabled,
  } = props
  return (
    <div className={clsx(``, containerClassName)}>
      <label htmlFor={id} className='block text-sm font-medium leading-6 text-gray-900'>
        {label}
      </label>
      <div className='mt-2'>
        <input
          id={id}
          type={type}
          disabled={disabled}
          autoComplete={autoComplete}
          className={clsx(
            `form-input 
            block w-full 
            rounded-md 
            border-0 
            py-1.5 
            text-gray-900 
            shadow-sm ring-1 
            ring-inset 
            ring-gray-300  
            placeholder:text-gray-400 
            focus:ring-2 
            focus:ring-inset 
            focus:ring-violet-600 
            sm:text-sm 
            sm:leading-6`,
            id && errors && errors[id] && 'focus:ring-rose-500',
            disabled && 'opacity-50 cursor-default',
            className
          )}
          {...(id && register ? register(id, { required }) : {})}
        />
      </div>
    </div>
  )
}

export default Input
