import Link from 'next/link'
import { FaCog, FaComment, FaHome, FaUser } from 'react-icons/fa'

function NavBar() {
  return (
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
  )
}

export default NavBar
