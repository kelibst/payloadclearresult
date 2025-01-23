'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Post } from '@/payload-types'

export async function getPosts() {
  try {
    const payload = await getPayload({ config })
    const posts = await payload.find({
      collection: 'posts',
      depth: 1,
      where: {
        _status: {
          equals: 'published',
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
    const response = await fetch('/api/users/me')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()

    if (!data?.user) throw new Error('User not authenticated')

    const comment = await payload.create({
      collection: 'comments',
      data: {
        post: postId,
        author: data?.user.id,
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
