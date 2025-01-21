import React, { useMemo } from 'react'
import RichText from '../RichText'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Avatar } from '@radix-ui/react-avatar'
import { User } from '@/payload-types'
import { format } from 'date-fns' // Import date-fns

type Comment = {
  id: number
  content: SerializedEditorState
  author: {
    id: number | User
    firstName: string
    lastName: string
  }
  createdAt: string
}

const Comment: React.FC<{ comment: Comment }> = ({ comment }) => {
  const authorName = comment?.author?.firstName + ' ' + comment?.author?.lastName
  const initials = useMemo(() => {
    return (
      comment?.author?.firstName?.charAt(0) + comment?.author?.lastName?.charAt(0)
    ).toUpperCase()
  }, [comment?.author])
  const formattedDate = comment?.createdAt ? format(new Date(comment.createdAt), 'PPP') : ''

  return (
    <div className="mt-4 p-4 w-full rounded-lg bg-gray-200 text-black dark:bg-black dark:text-white">
      {' '}
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="mr-2 p-4 rounded-full shadow-sm bg-gray-400 dark:bg-slate-900">
            {initials} {/* Display initials */}
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-bold">{authorName}</h4> {/* User's full name */}
            <p> {formattedDate}</p>
          </div>
        </div>
        <div className="p-2">
          <RichText data={comment?.content} />
        </div>
      </div>
    </div>
  )
}

export default Comment
