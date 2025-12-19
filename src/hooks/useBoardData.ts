import { useCallback, useEffect, useState } from 'react';
import type { Column } from '@/types/column';
import type { CardStatus } from '@/types/card';
import type { UseBoardDataReturn } from '@/interfaces/hooks';
import { fetchBoardComplete } from '@/services/boardService';
import { createColumn, deleteColumn, updateColumn } from '@/services/columnService';
import { createCard, deleteCard, updateCard } from '@/services/cardService';

export function useBoardData(boardId?: string): UseBoardDataReturn {
  const [columns, setColumns] = useState<Column[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadBoard = useCallback(async (id: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const columnsWithCards = await fetchBoardComplete(id)
      
      setColumns(columnsWithCards)
    } catch (err) {
      console.error('Failed to load board:', err)
      setError('Failed to load the board. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const addColumn = useCallback(
    async (title: string) => {
      if (!boardId) return
      
      try {
        await createColumn(boardId, title)
        
        await loadBoard(boardId)
      } catch (err) {
        console.error('Failed to add column:', err)
        setError('Failed to add the column.')
        throw err
      }
    },
    [boardId, loadBoard]
  )

  const addCard = useCallback(
    async (columnId: string, title: string, description?: string) => {
      if (!boardId) return
      
      try {
        await createCard(boardId, columnId, { title, description })
        
        await loadBoard(boardId)
      } catch (err) {
        console.error('Failed to add card:', err)
        setError('Failed to add the card.')
        throw err
      }
    },
    [boardId, loadBoard]
  )

  const renameColumn = useCallback(
    async (columnId: string, title: string) => {
      if (!boardId) return

      try {
        await updateColumn(boardId, columnId, { name: title })

        await loadBoard(boardId)
      } catch (err) {
        console.error('Failed to rename column:', err)
        setError('Failed to rename the column.')
        throw err
      }
    },
    [boardId, loadBoard]
  )

  const editCard = useCallback(
    async (
      cardId: string,
      data: { title: string; description?: string; status: CardStatus }
    ) => {
      if (!boardId) return

      try {
        await updateCard(boardId, cardId, data)

        await loadBoard(boardId)
      } catch (err) {
        console.error('Failed to edit card:', err)
        setError('Failed to update the card.')
        throw err
      }
    },
    [boardId, loadBoard]
  )

  const removeColumn = useCallback(
    async (columnId: string) => {
      if (!boardId) return
      
      try {
        await deleteColumn(boardId, columnId)
        
        await loadBoard(boardId)
      } catch (err) {
        console.error('Failed to delete column:', err)
        setError('Failed to delete the column.')
        throw err
      }
    },
    [boardId, loadBoard]
  )

  const removeCard = useCallback(
    async (cardId: string) => {
      if (!boardId) return
      
      try {
        await deleteCard(boardId, cardId)
        
        await loadBoard(boardId)
      } catch (err) {
        console.error('Failed to delete card:', err)
        setError('Failed to delete the card.')
        throw err
      }
    },
    [boardId, loadBoard]
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  useEffect(() => {
    if (boardId) {
      void loadBoard(boardId)
    }
  }, [boardId, loadBoard])

  return {
    columns,
    isLoading,
    error,
    loadBoard,
    addColumn,
    addCard,
    renameColumn,
    editCard,
    removeColumn,
    removeCard,
    clearError,
  }
}
