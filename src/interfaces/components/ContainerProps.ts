import type { BoxProps } from '@mui/material';
import type { SectionProps } from '@/types/common';

export interface ContainerProps extends BoxProps, SectionProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
}
