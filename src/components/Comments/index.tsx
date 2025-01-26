'use client'
import React, { useEffect, useMemo, useState } from 'react'
import RichText from '../RichText'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { User } from '@/payload-types'
import { format } from 'date-fns' // Import date-fns
import { getAuthUser } from '@/app/(frontend)/dashboard/actions'

type Comment = {
  id: number | Comment
  content: SerializedEditorState
  author: User
  createdAt: string
}

const Comment: React.FC<{ comment: Comment }> = ({ comment }) => {
  const authorName = comment?.author?.firstName + ' ' + comment?.author?.lastName
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const initials = useMemo(() => {
    return (
      comment?.author?.firstName?.charAt(0) + comment?.author?.lastName?.charAt(0)
    ).toUpperCase()
  }, [comment?.author])
  const formattedDate = comment?.createdAt ? format(new Date(comment.createdAt), 'PPP') : ''

  useEffect(() => {
    async function fetchLoggedInUser() {
      const user = await getAuthUser()
      setLoggedInUser(user)
    }
    fetchLoggedInUser()
  }, []) // Empty dependency array means this effect runs once when the component mounts

  const canDelete = useMemo(() => {
    return loggedInUser?.id === comment?.author?.id
  }, [loggedInUser, comment?.author])

  return (
    <div className="mt-4 p-4 w-full rounded-xl bg-gray-200 text-black dark:bg-black dark:text-white">
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
        <div className="p-2 flex flex-col">
          <RichText data={comment?.content} />
          {canDelete && (
            <button className="bg-red-500 self-end hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comment
