'use client'

import { useEffect, useState } from 'react'
import { getPosts, createComment } from './actions'
import { Comment } from '@/payload-types'

interface Post {
  id: number | Post
  title: string
  comments: Comment[]
}

export default function CommentsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<string>('')
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts()
        setPosts(response.docs)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPost || !comment.trim()) return

    setSubmitting(true)
    try {
      await createComment(selectedPost, comment)
      setComment('')
      // Optionally refresh posts to show new comment
    } catch (error) {
      console.error('Error creating comment:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="mx-auto">
      <div className="space-y-8">
        <div className="bg-card rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Create a Comment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="post"
                className="block text-sm font-medium text-muted-foreground mb-2"
              >
                Select Post
              </label>
              <select
                id="post"
                value={selectedPost}
                onChange={(e) => setSelectedPost(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-input text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Select a post...</option>
                {posts.map((post) => (
                  <option key={post.id} value={post.id}>
                    {post.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-muted-foreground mb-2"
              >
                Your Comment
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 rounded-md bg-input text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-secondary transition-colors duration-200 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Comment'}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-card rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-foreground">{post.title}</h3>
              {post.comments && post.comments.length > 0 ? (
                <div className="space-y-4">
                  {post.comments.map((comment: any) => (
                    <div
                      key={comment.id}
                      className="bg-background rounded-md p-4 border border-border"
                    >
                      <p className="text-foreground">{comment.content}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Status: <span className="capitalize">{comment.status}</span>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No comments yet</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
