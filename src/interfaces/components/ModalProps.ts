import type { DialogProps } from '@mui/material';
import type { ReactNode } from 'react';

type DialogPropsWithoutTitle = Omit<DialogProps, 'title'>;

export interface ModalProps extends DialogPropsWithoutTitle {
  id?: string;
  className?: string;
  title?: ReactNode;
  actions?: ReactNode;
  centered?: boolean;
}
