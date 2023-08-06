import clsx from 'clsx'
import { ButtonHTMLAttributes, FC } from 'react'

type ButtonColor = 'default' | 'inverted' | 'danger'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: ButtonColor
}

const Button: FC<ButtonProps> = (props) => {
  const { children, color = 'default', disabled, className, ...otherProps } = props

  return (
    <button
      className={clsx(
        `
      flex
      justify-center
      rounded-md
      px-3
      py-2
      text-sm
      font-semibold
      focus-visible:outline
      focus-visible:outline-2
      focus-visible:outline-offset-2`,
        disabled && 'opacity-50 cursor-default',
        color === 'default' && 'text-white bg-violet-500 focus-visible:outline-violet-600',
        color === 'default' && !disabled && 'hover:bg-violet-600',
        color === 'inverted' && 'text-gray-900',
        color === 'danger' && 'bg-rose-50 focus-visible:outline-rose-600',
        color === 'danger' && !disabled && 'hover:bg-rose-600',
        className
      )}
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default Button
