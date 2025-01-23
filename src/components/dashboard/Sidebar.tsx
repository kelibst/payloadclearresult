'use client'
import { FaBars, FaTimes } from 'react-icons/fa'
import NavBar from './NavBar'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MenuIcon } from 'lucide-react'

function Sidebar() {
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
    <aside
      className={`w-64 bg-primary p-4 space-y-4 transition-transform duration-300 transform ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 fixed md:relative z-10 h-full`}
    >
      <button onClick={toggleMenu} className="absolute top-4 right-[-20px] md:hidden">
        {isMenuOpen ? <FaTimes size={24} /> : <MenuIcon size={24} />}
      </button>
      <NavBar />
      <button
        onClick={handleLogout}
        className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </aside>
  )
}

export default Sidebar
