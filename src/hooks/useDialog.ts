import { useState, useCallback } from 'react';
import type { UseDialogReturn } from '@/interfaces/hooks';

export function useDialog(initialOpen = false): UseDialogReturn {
  const [open, setOpen] = useState(initialOpen);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return {
    open,
    handleOpen,
    handleClose,
    toggle,
    setOpen,
  };
}
