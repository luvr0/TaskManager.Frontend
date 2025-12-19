import { useCallback, useEffect, useState } from 'react';
import type { BoardData } from '@/types/board';
import type { LoadBoardsOptions, UseBoardsReturn } from '@/interfaces/hooks';
import { createBoard, fetchBoards, deleteBoard, addBoardMember, removeBoardMember, updateBoard } from '@/services/boardService';

export function useBoards(): UseBoardsReturn {
  const [boards, setBoards] = useState<BoardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBoards = useCallback(async (options?: LoadBoardsOptions) => {
    const silent = options?.silent ?? false;
    try {
      if (!silent) {
        setIsLoading(true);
      }
      setError(null);
      const response = await fetchBoards({ page: 1, per_page: 50 });
      setBoards(response.boards);
    } catch (err) {
      console.error('Failed to fetch boards:', err);
      setError('Failed to load boards. Please try again.');
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  }, []);

  const createNewBoard = useCallback(
    async (name: string) => {
      try {
        await createBoard(name);
        await loadBoards();
      } catch (err) {
        console.error('Failed to create board:', err);
        setError('Failed to create the board. Please try again.');
        throw err;
      }
    },
    [loadBoards]
  );

  const deleteBoardById = useCallback(
    async (boardId: string) => {
      try {
        await deleteBoard(boardId);
        await loadBoards();
      } catch (err) {
        console.error('Failed to delete board:', err);
        setError('Failed to delete the board. Please try again.');
        throw err;
      }
    },
    [loadBoards]
  );

  const renameBoard = useCallback(
    async (boardId: string, name: string) => {
      try {
        await updateBoard(boardId, name);
        await loadBoards({ silent: true });
      } catch (err) {
        console.error('Failed to rename board:', err);
        setError('Failed to rename the board. Please try again.');
        throw err;
      }
    },
    [loadBoards]
  );

  const addMemberToBoard = useCallback(
    async (boardId: string, email: string, role: string) => {
      try {
        await addBoardMember(boardId, email, role);
        await loadBoards({ silent: true });
      } catch (err) {
        console.error('Failed to add member:', err);
        setError('Failed to add the member. Please try again.');
        throw err;
      }
    },
    [loadBoards]
  );

  const removeMemberFromBoard = useCallback(
    async (boardId: string, memberId: string | number) => {
      try {
        await removeBoardMember(boardId, String(memberId));
        await loadBoards({ silent: true });
      } catch (err) {
        console.error('Failed to remove member:', err);
        setError('Failed to remove the member. Please try again.');
        throw err;
      }
    },
    [loadBoards]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    void loadBoards();
  }, [loadBoards]);

  return {
    boards,
    isLoading,
    error,
    loadBoards,
    createNewBoard,
    renameBoard,
    deleteBoardById,
    addMemberToBoard,
    removeMemberFromBoard,
    clearError,
  };
}
