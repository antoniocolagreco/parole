import clsx from 'clsx'
import { ButtonHTMLAttributes, FC } from 'react'
import { IconType } from 'react-icons'

type AuthSocialButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconType
}

const AuthSocialButton: FC<AuthSocialButtonProps> = (props) => {
  const { icon: Icon, disabled, className, ...otherProps } = props
  return (
    <button
      className={clsx(
        `inline-flex
      w-full
      justify-center
      rounded-md
      bg-white
      px-4
      py-2
      text-gray-500
      shadow-md
      ring-1
      ring-inset
      ring-gray-300
      hover:bg-gray-100
      outline-violet-600
      focus:outline-offset-0
      focus-visible:outline
      focus-visible:outline-2
      focus-visible:outline-offset-2`,
        disabled && 'hover:bg-white',
        className
      )}
      disabled={disabled}
      {...otherProps}
    >
      <Icon />
    </button>
  )
}

export default AuthSocialButton
