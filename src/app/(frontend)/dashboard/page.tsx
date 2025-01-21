'use client'

import { useState } from 'react'
import { FaBars, FaTimes, FaHome, FaUser, FaCog, FaComment } from 'react-icons/fa'
import Link from 'next/link'

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar / Menu */}
      <aside
        className={`bg-gray-800 text-white w-64 p-4 space-y-4 transition-transform duration-300 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative z-10 h-full`}
      >
        {/* Close Button (Mobile) */}
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-white md:hidden"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Menu Items */}
        <nav className="mt-8">
          <Link
            href="/dashboard"
            className="flex items-center p-2 hover:bg-gray-700 rounded"
          >
            <FaHome className="mr-2" />
            Home
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex items-center p-2 hover:bg-gray-700 rounded"
          >
            <FaUser className="mr-2" />
            Profile
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center p-2 hover:bg-gray-700 rounded"
          >
            <FaCog className="mr-2" />
            Settings
          </Link>
          <Link
            href="/dashboard/comments"
            className="flex items-center p-2 hover:bg-gray-700 rounded"
          >
            <FaComment className="mr-2" />
            Comments
          </Link>
        </nav>
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