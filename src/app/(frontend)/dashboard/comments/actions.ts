'use server'
import { SerializedEditorState } from 'node_modules/lexical/LexicalEditorState'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Post } from '@/payload-types'
import { getAuthUser } from '../actions'

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
        comments: {},
      },
    })
    return posts
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    throw error
  }
}

export async function createComment(postId: number | Post, content: SerializedEditorState) {
  const payload = await getPayload({ config })
  try {
    const result = await getAuthUser()
    if (!result?.success) {
      return { error: 'User not loggedIn', success: false, comment: content }
    }
    const comment = await payload.create({
      collection: 'comments',
      data: {
        post: Number(postId),
        //@ts-expect-error
        author: result?.user?.id,
        content,
        status: 'pending',
      },
    })
    // console.log(comment, 'comment')
    return { error: '', success: true, comment: comment }
  } catch (error) {
    console.error('Failed to create comment:', error)
    return {
      error: error?.message || 'Error hwen adding the comment',
      success: false,
      comment: content,
    }
  }
}

export type CommentResponse = {
  success: boolean
  message?: string
  commentId?: number
}

export async function deleteComment(commentId: number): Promise<CommentResponse> {
  const payload = await getPayload({ config })
  try {
    const user = await getAuthUser()
    const comment = await payload.findByID({
      collection: 'comments',
      id: commentId,
    })
    //@ts-expect-error
    if (comment.author?.id !== user.id) {
      return {
        success: false,
        message: 'You are not authorized to delete this comment',
      }
    }
    await payload.delete({
      collection: 'comments',
      id: commentId,
    })
    return {
      success: true,
      commentId: commentId,
    }
  } catch (error) {
    console.error('Failed to delete comment:', error)
    return {
      success: false,
      message: 'Failed to delete comment',
    }
  }
}
