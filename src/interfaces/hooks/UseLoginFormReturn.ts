export interface UseLoginFormReturn {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  isSubmitting: boolean;
  errorMessage: string | null;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleFieldChange: (setter: (value: string) => void, value: string) => void;
}
