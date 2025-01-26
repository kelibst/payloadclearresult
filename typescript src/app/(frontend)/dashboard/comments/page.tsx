import { useEffect, useState } from 'react'
import { getPosts, createComment } from './actions'
import { Comment } from '@/payload-types'
import { SerializedEditorState } from 'node_modules/lexical/LexicalEditorState'
import { RichTextInput } from '@/components/RichTextInput'

interface Post {
  id: number | Post
  title: string
  comments: Comment[]
}

export default function CommentsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<number>(0)
  const [comment, setComment] = useState<SerializedEditorState | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

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
    if (!selectedPost || !comment) return

    setSubmitting(true)
    setErrorMessage(null) // Reset error message
    setSuccessMessage(null) // Reset success message

    try {
      await createComment(selectedPost, JSON.stringify(comment))
      setComment(null) // Clear the comment input
      setSuccessMessage('Comment submitted successfully!') // Set success message
      // Optionally refresh posts to show new comment
    } catch (error) {
      console.error('Error creating comment:', error)
      setErrorMessage('Failed to create comment. Please try again.') // Set error message
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
                onChange={(e) => setSelectedPost(Number(e.target.value))}
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

          {/* Display error or success messages */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
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
                      <div className="prose dark:prose-invert max-w-none">{comment.content}</div>
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
