import type { Column } from '@/types/column';
import type { CardStatus } from '@/types/card';

export interface UseBoardDataReturn {
  columns: Column[];
  isLoading: boolean;
  error: string | null;
  loadBoard: (boardId: string) => Promise<void>;
  addColumn: (title: string) => Promise<void>;
  addCard: (columnId: string, title: string, description?: string) => Promise<void>;
  renameColumn: (columnId: string, title: string) => Promise<void>;
  editCard: (
    cardId: string,
    data: { title: string; description?: string; status: CardStatus }
  ) => Promise<void>;
  removeColumn: (columnId: string) => Promise<void>;
  removeCard: (cardId: string) => Promise<void>;
  clearError: () => void;
}
