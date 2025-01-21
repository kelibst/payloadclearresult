'use server'

import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  try {
    const payload = await getPayload({ config })
    
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
    })

    // Set the payload token as a cookie
    const cookieStore = cookies()
    cookieStore.set('payload-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
  } catch (error) {
    console.error('Login error:', error)
    throw new Error('Login failed. Please check your credentials and try again.')
  }
  redirect('/home')
}