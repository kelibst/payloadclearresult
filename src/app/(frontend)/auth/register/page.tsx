import { RegisterForm } from '@/components/RegistrationForm'
import { register } from './actions'

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center my-6">
      <div className="max-w-2xl w-full p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <RegisterForm register={register} />
      </div>
    </div>
  )
}
