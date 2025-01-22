import { checkAuthStatus } from '@/app/(frontend)/auth/login/checkAuthStatus'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = await checkAuthStatus()

  if (!isAuthenticated) {
    redirect('/auth/login')
  }

  return <>{children}</>
}
