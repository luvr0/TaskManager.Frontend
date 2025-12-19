import { useState, useEffect } from 'react';
import { getAccessToken } from '@/services/tokenStore';
import { decodeJwt } from '@/lib/jwt';
import type { UseUserProfileReturn } from '@/interfaces/hooks';

export function useUserProfile(): UseUserProfileReturn {
  const [userEmail, setUserEmail] = useState('');
  const [userInitials, setUserInitials] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    const payload = decodeJwt(token);
    if (!payload) return;

    const email = (payload.email as string) || (payload.Email as string) || '';
    const name = (payload.name as string) || (payload.Name as string) || '';

    setUserEmail(email);
    setUserName(name);

    if (name) {
      const nameParts = name.split(' ');
      const initials = nameParts.length >= 2
        ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
        : name.substring(0, 2).toUpperCase();
      setUserInitials(initials);
    } else if (email) {
      setUserInitials(email.substring(0, 2).toUpperCase());
    }
  }, []);

  return {
    userEmail,
    userInitials,
    userName,
  };
}
