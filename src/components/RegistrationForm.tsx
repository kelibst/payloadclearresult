'use client'

import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { registerSchema } from '@/lib/schemas/auth'
import { z } from 'zod'
import { Toast } from './Toast'
import Link from 'next/link'

interface RegisterFormProps {
  register: (formData: FormData) => Promise<{ message: any }>
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <div className="flex justify-center items-center">
      <button type="submit" disabled={pending} className="w-full disabled:bg-blue-300">
        {pending ? 'Registering...' : 'Register'}
      </button>
      <div>
        <span className="text-sm text-gray-500">Already have an account? </span>
        <Link href="/auth/login" className="text-blue-500 underline my-4 pt-4">
          Login
        </Link>
      </div>
    </div>
  )
}

export function RegisterForm({ register }: RegisterFormProps) {
  const router = useRouter()
  const [redirected, setRedirected] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<z.ZodIssue[]>([])
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  useEffect(() => {
    if (toastMessage) {
      console.log(toastMessage, 'toast')
      const timer = setTimeout(() => {
        setToastMessage(null)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  async function handleSubmit(formData: FormData) {
    setErrors([])
    const formDataObject = Object.fromEntries(formData.entries())
    try {
      registerSchema.parse(formDataObject)
      const response = await register(formData)
      if (response && typeof response === 'object' && response?.message) {
        setToastMessage(response.message)
        return
      }
      setRedirected(true)
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.issues)
      }
    }
  }

  if (redirected) {
    router.push('/auth/login')
    return null
  }

  return (
    <div className="relative">
      {toastMessage && <Toast message={toastMessage} />}
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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

        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
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
            {showPassword ? <FaEyeSlash size={30} /> : <FaEye size={30} />}
          </button>
          {errors.find((error) => error.path.includes('password')) && (
            <p className="text-red-500 text-sm mt-1">
              {errors.find((error) => error.path.includes('password'))?.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-[10px] flex items-center px-2 focus:outline-none"
          >
            {showConfirmPassword ? <FaEyeSlash size={30} /> : <FaEye size={30} />}
          </button>
          {errors.find((error) => error.path.includes('confirmPassword')) && (
            <p className="text-red-500 text-sm mt-1">
              {errors.find((error) => error.path.includes('confirmPassword'))?.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
          {errors.find((error) => error.path.includes('firstName')) && (
            <p className="text-red-500 text-sm mt-1">
              {errors.find((error) => error.path.includes('firstName'))?.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
          {errors.find((error) => error.path.includes('lastName')) && (
            <p className="text-red-500 text-sm mt-1">
              {errors.find((error) => error.path.includes('lastName'))?.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
          {errors.find((error) => error.path.includes('dateOfBirth')) && (
            <p className="text-red-500 text-sm mt-1">
              {errors.find((error) => error.path.includes('dateOfBirth'))?.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.find((error) => error.path.includes('gender')) && (
            <p className="text-red-500 text-sm mt-1">
              {errors.find((error) => error.path.includes('gender'))?.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
          {errors.find((error) => error.path.includes('phoneNumber')) && (
            <p className="text-red-500 text-sm mt-1">
              {errors.find((error) => error.path.includes('phoneNumber'))?.message}
            </p>
          )}
        </div>

        <SubmitButton />
      </form>
    </div>
  )
}
