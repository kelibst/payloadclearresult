import { LoginForm } from '@/components/LoginForm'
import { login } from './actions'
import { redirect } from 'next/navigation'
import { checkAuthStatus } from './checkAuthStatus'

export default async function Login() {
  const { isAuthenticated } = await checkAuthStatus()

  if (isAuthenticated) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center my-2">
      <div className="max-w-2xl w-full p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <LoginForm login={login} />
      </div>
    </div>
  )
}
