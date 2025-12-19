import type { BoardData } from '@/types/board';

export interface LoadBoardsOptions {
  silent?: boolean;
}

export interface UseBoardsReturn {
  boards: BoardData[];
  isLoading: boolean;
  error: string | null;
  loadBoards: (options?: LoadBoardsOptions) => Promise<void>;
  createNewBoard: (name: string) => Promise<void>;
  renameBoard: (boardId: string, name: string) => Promise<void>;
  deleteBoardById: (boardId: string) => Promise<void>;
  addMemberToBoard: (boardId: string, email: string, role: string) => Promise<void>;
  removeMemberFromBoard: (boardId: string, memberId: string | number) => Promise<void>;
  clearError: () => void;
}
