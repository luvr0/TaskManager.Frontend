import type { ReactNode } from 'react';
export interface PopoverItemProps {
  onClick: () => void;
  icon?: ReactNode;
  children: ReactNode;
  variant?: 'default' | 'destructive' | 'disabled';
}
