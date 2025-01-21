import { LoginForm } from '@/components/LoginForm'
import { login } from './actions'

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center my-2">
      <div className="max-w-2xl w-full p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <LoginForm login={login} />
      </div>
    </div>
  )
}
