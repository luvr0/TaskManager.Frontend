import type { Card } from '@/types/card';

export interface ColumnHeaderProps {
  title: string;
  cardCount: number;
  onRename?: (newTitle: string) => void;
  onDelete?: () => void;
}

export interface ColumnProps {
  column: {
    id: string;
    title: string;
    cards: Card[];
    order: number;
  };
  onAddCard?: () => void;
  onRenameColumn?: (columnId: string, currentTitle: string) => void;
  onDeleteColumn?: () => void;
  onDeleteCard?: (cardId: string) => void;
  onEditCard?: (card: Card) => void;
}
