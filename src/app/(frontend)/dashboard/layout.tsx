import { checkAuthStatus } from '@/app/(frontend)/auth/login/checkAuthStatus'
import Sidebar from '@/components/dashboard/Sidebar'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = await checkAuthStatus()

  if (!isAuthenticated) {
    redirect('/auth/login')
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:ml-64">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        {children}
      </main>
    </div>
  )
}
