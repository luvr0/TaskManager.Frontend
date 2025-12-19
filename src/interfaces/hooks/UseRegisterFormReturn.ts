export interface RegisterFieldErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface UseRegisterFormReturn {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  isSubmitting: boolean;
  formError: string | null;
  fieldErrors: RegisterFieldErrors;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleFieldChange: (
    setter: (value: string) => void,
    value: string,
    field?: keyof RegisterFieldErrors
  ) => void;
}
