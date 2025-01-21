'use server'
import { headers as nextHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'

export async function checkAuthStatus() {
  const headers = await nextHeaders()
  try {
    const payload = await getPayload({ config })
    const result = await payload.auth({ headers })
    return { isAuthenticated: !!result?.user }
  } catch (error) {
    return { isAuthenticated: false }
  }
}
