'use client'

import { useCallback, useState } from 'react';
import type { UseNewBoardModalReturn } from '@/interfaces/hooks';

export function useNewBoardModal(
  initial = false, 
  onCreate?: (name: string) => void
): UseNewBoardModalReturn {
  const [open, setOpenState] = useState<boolean>(initial);

  const openModal = useCallback(() => setOpenState(true), []);
  const closeModal = useCallback(() => setOpenState(false), []);

  const createAndClose = useCallback(
    (name: string) => {
      try {
        onCreate?.(name);
      } finally {
        closeModal();
      }
    },
    [onCreate, closeModal]
  );

  return {
    open,
    openModal,
    closeModal,
    createAndClose,
    setOpen: setOpenState,
  };
}
