import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface User {
  email: string;
  username: string;
  isAdmin: boolean;
}

export const useCurrentUser = () => {
  const user = useSelector((state: RootState) => state.auth.user) as User | null;
  return user;
};