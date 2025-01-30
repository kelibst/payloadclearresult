'use client'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { useState } from 'react'
import { RichTextInput } from '../RichTextInput'
import { createComment } from '@/app/(frontend)/dashboard/comments/actions'

export default function CreateComment({ postId }) {
  const [comment, setComment] = useState<SerializedEditorState | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setSubmitting(true)

    try {
      //@ts-expect-error
      const newComment = await createComment(postId, comment)
      console.log(newComment, 'newcomment')
      setComment(null) // Clear the comment input
      // Optionally refresh posts to show new comment
    } catch (error) {
      console.error('Error creating comment:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-8 my-4 md:my-6">
      <div className="rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Create a Comment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-muted-foreground mb-2"
            >
              Your Comment
            </label>
            <div className="border border-border rounded-md overflow-hidden">
              <RichTextInput onChange={setComment} initialValue={comment} />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-4 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-secondary transition-colors duration-200 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Comment'}
          </button>
        </form>
      </div>
    </div>
  )
}
