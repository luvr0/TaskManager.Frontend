import { apiClient } from './apiClient';
import type { Card, CardStatus } from '@/types/card';
import type { ApiCardsResponse } from '@/types/api';
import type { CardsListParams, CardsListResponse } from '@/types/services';
import { mapApiCardsResponse } from '@/mappers/cardMapper';

export async function fetchCards(
  boardId: string,
  columnId: string,
  params?: CardsListParams
): Promise<CardsListResponse> {
  const queryParams = new URLSearchParams({
    page: String(params?.page || 1),
    per_page: String(params?.per_page || 10),
  })

  const response = await apiClient.get<ApiCardsResponse>(
    `/Boards/${boardId}/Columns/${columnId}/Cards?${queryParams.toString()}`
  )
  return mapApiCardsResponse(response.data)
}

export async function createCard(
  boardId: string,
  columnId: string,
  data: { title: string; description?: string; status?: string }
): Promise<void> {
  await apiClient.post(
    `/Boards/${boardId}/Columns/${columnId}/Cards`,
    data
  )
}

export async function updateCard(
  boardId: string,
  cardId: string,
  data: Partial<{ title: string; description: string; status: CardStatus }>
): Promise<Card> {
  const response = await apiClient.put<Card>(
    `/Boards/${boardId}/Cards/${cardId}`,
    data
  )
  return response.data
}

export async function deleteCard(
  boardId: string,
  cardId: string
): Promise<void> {
  await apiClient.delete(`/Boards/${boardId}/Cards/${cardId}`)
}

export async function moveCard(
  boardId: string,
  cardId: string,
  targetColumnId: string,
  targetOrder: number
): Promise<Card> {
  const response = await apiClient.patch<Card>(
    `/Boards/${boardId}/Cards/${cardId}/move`,
    {
      columnId: targetColumnId,
      order: targetOrder,
    }
  )
  return response.data
}
