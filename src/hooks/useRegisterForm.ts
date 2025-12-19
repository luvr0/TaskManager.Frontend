import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/services/authService';
import type { RegisterFieldErrors, UseRegisterFormReturn } from '@/interfaces/hooks';

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 100;
const EMAIL_MAX_LENGTH = 200;
const PASSWORD_MAX_LENGTH = 100;
const SUPPORTED_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com|yahoo\.com)$/;
const PASSWORD_STRENGTH_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,;:+\-=_(){}\[\]^~]).{8,}$/;
const SUPPORTED_EMAIL_MESSAGE = 'Email must belong to a supported provider: gmail.com, hotmail.com, outlook.com, yahoo.com.';
const PASSWORD_STRENGTH_MESSAGE = 'Password must be strong: minimum 8 characters, with upper/lowercase letters, digits, and special characters.';
const DUPLICATE_EMAIL_MESSAGE = 'User with this email already exists';

export function useRegisterForm(): UseRegisterFormReturn {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});

  const validateForm = useCallback((): boolean => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const errors: RegisterFieldErrors = {};

    if (!trimmedName) {
      errors.name = 'Name is required.';
    } else if (trimmedName.length < NAME_MIN_LENGTH || trimmedName.length > NAME_MAX_LENGTH) {
      errors.name = 'Name must be between 2 and 100 characters.';
    }

    if (!trimmedEmail) {
      errors.email = 'Email is required.';
    } else if (trimmedEmail.length > EMAIL_MAX_LENGTH) {
      errors.email = 'Email must be at most 200 characters.';
    } else if (!SUPPORTED_EMAIL_REGEX.test(trimmedEmail)) {
      errors.email = SUPPORTED_EMAIL_MESSAGE;
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      errors.password = 'Password must be at most 100 characters.';
    } else if (!PASSWORD_STRENGTH_REGEX.test(password)) {
      errors.password = PASSWORD_STRENGTH_MESSAGE;
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Passwords must match.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords must match.';
    }

    const hasErrors = Object.keys(errors).length > 0;
    setFieldErrors(errors);

    if (hasErrors) {
      setFormError(null);
    }

    return !hasErrors;
  }, [name, email, password, confirmPassword]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      router.push('/login');
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error creating account. Please try again.';
      if (typeof errorMessage === 'string' && errorMessage.includes(DUPLICATE_EMAIL_MESSAGE)) {
        setFieldErrors((prev) => ({ ...prev, email: errorMessage }));
      } else {
        setFormError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [name, email, password, validateForm, router]);

  const handleFieldChange = useCallback((
    setter: (value: string) => void,
    value: string,
    field?: keyof RegisterFieldErrors
  ) => {
    setter(value);
    if (field) {
      setFieldErrors((prev) => {
        if (!prev[field]) return prev;
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
    if (formError) setFormError(null);
  }, [formError]);

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isSubmitting,
    formError,
    fieldErrors,
    handleSubmit,
    handleFieldChange,
  };
}
