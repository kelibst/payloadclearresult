'use server'

export async function getProfile() {
  try {
    const response = await fetch('/api/users/me')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return { user: data.user }
  } catch (error) {
    console.error('Failed to fetch profile:', error)
    throw error
  }
}
