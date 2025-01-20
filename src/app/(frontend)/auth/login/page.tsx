import { LoginForm } from '@/components/LoginForm'
import { login } from './actions'

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <LoginForm login={login} />
      </div>
    </div>
  )
}