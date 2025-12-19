import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';
import type { UseLoginFormReturn } from '@/interfaces/hooks';

export function useLoginForm(): UseLoginFormReturn {
  const router = useRouter();
  const { login, authError, clearError } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      router.push('/boards');
    } catch {
      setFormError('Login error. Check your credentials and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [email, password, login, router]);

  const handleFieldChange = useCallback((
    setter: (value: string) => void,
    value: string
  ) => {
    setter(value);
    if (formError) setFormError(null);
    if (authError) clearError();
  }, [formError, authError, clearError]);

  const errorMessage = formError ?? authError;

  return {
    email,
    setEmail,
    password,
    setPassword,
    isSubmitting,
    errorMessage,
    handleSubmit,
    handleFieldChange,
  };
}
