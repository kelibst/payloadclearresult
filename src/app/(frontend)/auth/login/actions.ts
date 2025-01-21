'use server'
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
    const cookieStore = await cookies()
    //
    if(result.token) {
       cookieStore.set('payload-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
    }
   
    return { message: 'success' }
     } catch (error: any) {
    console.error('Login error:', error)
    const message = error?.cause?.message || error.message || 'Login failed. Please check your credentials and try again.'
    return { message }
  }
}