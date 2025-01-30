'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { headers as nextHeaders } from 'next/headers'

export async function getUserComments(userId: string) {
  try {
    const payload = await getPayload({ config })

    const commentData = await payload.find({
      collection: 'comments',
      where: {
        author: {
          equals: userId,
        },
      },
    })

    return commentData.docs
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw new Error('Failed to fetch comments')
  }
}

export async function getAuthUser() {
  try {
    const payload = await getPayload({ config })
    const headers = await nextHeaders()
    const result = await payload.auth({ headers })
    if (!result.user) {
      return { success: false, user: {} }
    }
    return { success: true, user: result.user }
  } catch (error) {
    console.error('Error getting user:', error)
    throw new Error('Failed to get user')
  }
}
