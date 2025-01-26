'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Post } from '@/payload-types'
import { headers as nextHeaders } from 'next/headers'

export async function getPosts() {
  try {
    const payload = await getPayload({ config })
    const posts = await payload.find({
      collection: 'posts',
      depth: 2, // Increase depth to get nested relationships
      where: {
        _status: {
          equals: 'published',
        },
      },
      populate: {
        comments: {
          depth: 1,
          sort: '-createdAt', // Sort comments by creation date, newest first
          populate: {
            author: {
              fields: ['id', 'firstName', 'lastName'], // Specify which user fields to include
            },
          },
        },
      },
    })
    return posts
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    throw error
  }
}

export async function createComment(postId: number | Post, content: string) {
  const payload = await getPayload({ config })
  try {
    const headers = await nextHeaders()
    const result = await payload.auth({ headers })
    if (!result.user) {
      throw new Error('You must be logged in to create a comment')
    }
    const comment = await payload.create({
      collection: 'comments',
      data: {
        post: postId,
        author: result.user.id,
        content,
        status: 'pending',
      },
    })
    return comment
  } catch (error) {
    console.error('Failed to create comment:', error)
    throw error
  }
}
