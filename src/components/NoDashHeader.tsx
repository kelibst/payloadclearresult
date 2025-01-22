'use client'
import { usePathname } from 'next/navigation'
import React, { Suspense } from 'react'

const NoDashHeader = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith('/dashboard')

  if (isDashboard) return null
  return <>{children}</>
}

export default NoDashHeader
