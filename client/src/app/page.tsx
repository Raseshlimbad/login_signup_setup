
'use client';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function Home() {
  const user = useCurrentUser();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to MyApp</h1>
      {user && (
        <p className="text-lg text-gray-600">
          Hello, {user.username}! This is your dashboard.
        </p>
      )}
    </div>
  );
}
