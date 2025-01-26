'use server'
import { headers as nextHeaders } from 'next/headers'
import config from '@payload-config'

import { getPayload } from 'payload'

export async function getProfile() {
  const payload = await getPayload({ config })
  try {
    const headers = await nextHeaders()
    const result = await payload.auth({ headers })
    if (!result.user) {
      throw new Error('You must be logged in to create a comment')
    }

    return { user: result.user }
  } catch (error) {
    console.error('Failed to fetch profile:', error)
    throw error
  }
}
