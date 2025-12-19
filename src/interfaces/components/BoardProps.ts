import { BoxProps } from '@mui/material';

export interface BoardProps extends BoxProps {
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  members?: Array<{
    initials: string;
    color?: string;
  }>;
  count?: number;
}
export interface BoardCardProps {
  boardId: string;
  title: string;
  members: Array<{
    initials: string;
    color?: string;
  }>;
  stats: {
    columnsCount: number;
    cardsCount: number;
  };
  onClick?: () => void;
  onMenuClick?: () => void;
  onDelete?: () => void;
  onAddMember?: (email: string, role: string) => Promise<void> | void;
  onRemoveMember?: (memberId: number | string) => Promise<void> | void;
  onRenameBoard?: (newName: string) => Promise<void> | void;
}
