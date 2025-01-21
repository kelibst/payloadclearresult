 'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

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