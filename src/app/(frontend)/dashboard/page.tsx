'use client'

import { useState } from 'react'
import { FaBars, FaTimes, FaHome, FaUser, FaCog, FaComment } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
      })
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar / Menu */}
      <aside
        className={`-64 bg-primary p-4 space-y-4 transition-transform duration-300 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative z-10 h-full`}
      >
        {/* Close Button (Mobile) */}
        <button onClick={toggleMenu} className="absolute top-4 right-4  md:hidden">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Menu Items */}
        <nav className="mt-8">
          <Link href="/dashboard" className="flex items-center p-2 rounded">
            <FaHome className="mr-2" />
            Home
          </Link>
          <Link href="/dashboard/profile" className="flex items-center p-2 rounded">
            <FaUser className="mr-2" />
            Profile
          </Link>
          <Link href="/dashboard/settings" className="flex items-center p-2 rounded">
            <FaCog className="mr-2" />
            Settings
          </Link>
          <Link href="/dashboard/comments" className="flex items-center p-2 rounded">
            <FaComment className="mr-2" />
            Comments
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:ml-64">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        {/* Add more content here */}
      </main>
    </div>
  )
}
