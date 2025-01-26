import { Post } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const getPostsComments = async (post: Post) => {
  const payload = await getPayload({ config: configPromise })
  return (
    await payload.find({
      collection: 'comments',
      where: {
        post: { equals: post?.id },
        status: { equals: 'approved' },
      },
      depth: 1, // Important to populate author!
    })
  ).docs
}
