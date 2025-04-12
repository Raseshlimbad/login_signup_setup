'use client';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';
import { toast } from 'sonner';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Tasks', href: '/tasks' },
];

export default function Navbar() {
  const user = useCurrentUser();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'mutation { logout }' })
      });
      dispatch(logout());
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
          {user && (
            <div className="flex gap-6">
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
        <div className="flex items-center gap-4">
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
      <div className="h-16"></div> {/* Spacer to prevent content from hiding under navbar */}
    </>
  );
}
