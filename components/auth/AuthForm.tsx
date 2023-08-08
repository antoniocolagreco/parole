'use client'

import { default as dictionary } from '@languages/en.json'
import axios, { AxiosError } from 'axios'
import clsx from 'clsx'
import { signIn } from 'next-auth/react'
import { FC, HTMLAttributes, useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import Button from '../inputs/Button'
import Input from '../inputs/Input'
import AuthSocialButton from './AuthSocialButton'

type AuthFromProps = HTMLAttributes<HTMLDivElement> & {}

enum Variant {
  LOGIN,
  REGISTER,
}

const AuthForm: FC<AuthFromProps> = (props) => {
  const { className, ...otherProps } = props
  const [variant, setVariant] = useState<Variant>(Variant.LOGIN)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    if (variant === Variant.REGISTER) {
      axios
        .post('/api/register', data)
        .then((response) => {
          signIn('credentials', data)
        })
        .catch((error: AxiosError) => {
          console.log(error)
          toast.error(error.response?.data as string)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    if (variant === Variant.LOGIN) {
      signIn('credentials', { ...data, redirect: false })
        .then((response) => {
          if (response?.error) {
            toast.error(response.error)
          }
          if (response?.ok && !response.error) {
            toast.success('Success')
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true)
    signIn(action, { redirect: false })
      .then((response) => {
        if (response?.error) {
          toast.error(response.error)
        }
        if (response?.ok && !response.error) {
          toast.success('Success')
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const toggleVariant = useCallback(() => {
    if (variant === Variant.LOGIN) {
      setVariant(Variant.REGISTER)
    } else {
      setVariant(Variant.LOGIN)
    }
  }, [variant])

  return (
    <div className={clsx(`mt-8 mx-auto w-full max-w-md`, className)} {...otherProps}>
      <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === Variant.REGISTER && (
            <Input
              id='name'
              type='text'
              label={dictionary.name}
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id='email'
            type='email'
            label={dictionary.email_address}
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id='password'
            type='password'
            autoComplete='current-password'
            label={dictionary.password}
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Button className='w-full' disabled={isLoading} type='submit'>
            {variant === Variant.LOGIN ? dictionary.sign_in : dictionary.register}
          </Button>
        </form>
        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-x-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white px-2 text-gray-500'>{dictionary.or_continue_with}</span>
            </div>
          </div>
        </div>

        <div className='mt-6 flex gap-2'>
          <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} disabled={isLoading} />
          <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} disabled={isLoading} />
        </div>

        <div
          className='
        flex
        gap-2
        justify-center
        text-sm
        mt-6
        text-gray-500'
        >
          <div>{variant === Variant.LOGIN ? dictionary.new_to_app : dictionary.already_have_an_account}</div>
          <div
            className={clsx('underline', isLoading ? 'cursor-default' : 'cursor-pointer')}
            {...(isLoading ? {} : { onClick: toggleVariant })}
          >
            {variant === Variant.LOGIN ? dictionary.create_an_account : dictionary.login}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
