'use client'

import { useState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { loginSchema } from '@/lib/schemas/auth'
import { z } from 'zod'
import { Toast } from './Toast'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface LoginFormProps {
  login: (formData: FormData) => Promise<{ message: any }>
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <div className="flex flex-col justify-center items-center">
      <button type="submit" disabled={pending} className="w-full disabled:bg-blue-300">
        {pending ? 'Logging in...' : 'Login'}
      </button>
      <div className="pt-4">
        <span>
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-blue-500 underline my-4 pt-4">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  )
}

export function LoginForm({ login }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<z.ZodIssue[]>([])
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  async function handleSubmit(formData: FormData) {
    setErrors([])
    const formDataObject = Object.fromEntries(formData.entries())
    try {
      loginSchema.parse(formDataObject)
      const response = await login(formData)
      if (response && typeof response === 'object' && response?.message !== 'success') {
        setToastMessage(response.message)
        return
      } else if (response && typeof response === 'object' && response?.message === 'success') {
        redirect('/dashboard')
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.issues)
      }
    }
  }

  return (
    <div className="relative">
      {toastMessage && <Toast message={toastMessage} />}
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
          {errors.find((error) => error.path.includes('email')) && (
            <p className="text-red-500 text-sm mt-1">
              {errors.find((error) => error.path.includes('email'))?.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className=" block text-sm font-medium">
            Password
          </label>
          <div className="flex relative items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-[10px] flex items-center px-2 focus:outline-none"
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500" size={30} />
              ) : (
                <FaEye className="text-gray-500" size={30} />
              )}
            </button>
          </div>
          {errors.find((error) => error.path.includes('password')) && (
            <p className="text-red-500 text-sm mt-1">
              {errors.find((error) => error.path.includes('password'))?.message}
            </p>
          )}
        </div>

        <SubmitButton />
      </form>
    </div>
  )
}
