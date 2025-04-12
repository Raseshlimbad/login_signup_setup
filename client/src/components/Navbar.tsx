'use client';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';
import { toast } from 'sonner';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Tasks', href: '/tasks' },
];

export default function Navbar() {
  const user = useCurrentUser();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'mutation { logout }' })
      });
      dispatch(logout());
      router.push('/auth');
      toast.success('Logged out successfully! 👋');
    } catch (error) {
      console.log("Error logging out: ", error);
      toast.error('Failed to logout. Please try again.');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center shadow-md bg-white z-50">
        <div className="flex items-center gap-8">
          <h1 className="font-bold text-xl">MyApp</h1>
          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-0.5 w-full bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`h-0.5 w-full bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-full bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>

        {/* Desktop User Menu */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-600">Hello, {user.username}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed top-16 left-0 right-0 bg-white shadow-md transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        {user && (
          <div className="flex flex-col p-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t mt-4 pt-4">
              <span className="block text-gray-600 mb-2">Hello, {user.username}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}
        {!user && (
          <div className="p-4">
            <Link
              href="/auth"
              className="block w-full text-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        )}
      </div>
      <div className="h-16" />
    </>
  );
}
