import { apiClient } from './apiClient';
import { getAccessToken } from './tokenStore';
import { getUserIdFromToken } from '@/lib/jwt';
import type { Board } from '@/types/board';
import type { Column } from '@/types/column';
import type { ApiBoardsResponse, ApiBoardComplete } from '@/types/api';
import type { BoardsListParams, BoardsListResponse } from '@/types/services';
import {
  mapApiBoardsResponse,
  mapApiBoardCompleteToColumns,
} from '@/mappers/boardMapper';

export async function fetchBoards(params?: BoardsListParams): Promise<BoardsListResponse> {
  const token = getAccessToken();
  const userId = getUserIdFromToken(token);

  const queryParams = new URLSearchParams({
    user_id: userId || 'null',
    page: String(params?.page || 1),
    per_page: String(params?.per_page || 10),
  });

  const response = await apiClient.get<ApiBoardsResponse>(`/Boards?${queryParams.toString()}`);
  return mapApiBoardsResponse(response.data);
}

export async function createBoard(title: string): Promise<Board> {
  const token = getAccessToken();
  const userId = getUserIdFromToken(token);
  
  if (!userId) {
    throw new Error('User ID not found. Please log in again.');
  }

  const response = await apiClient.post<Board>('/Boards', { 
    name: title,
    ownerId: Number(userId)
  });
  return response.data;
}

export async function deleteBoard(boardId: string): Promise<void> {
  await apiClient.delete(`/Boards/${boardId}`);
}

export async function updateBoard(boardId: string, name: string): Promise<Board> {
  const payload = {
    id: Number(boardId),
    name,
  };

  const response = await apiClient.put<Board>(`/Boards/${boardId}`, payload);
  return response.data;
}

export async function fetchBoardComplete(boardId: string): Promise<Column[]> {
  const response = await apiClient.get<ApiBoardComplete>(`/Boards/${boardId}`);
  return mapApiBoardCompleteToColumns(response.data);
}

export async function addBoardMember(boardId: string, email: string, role: string): Promise<void> {
  await apiClient.post(`/Boards/${boardId}/Members`, { email, role });
}

export async function fetchBoardMembers(boardId: string): Promise<Array<{ userId: number; role: string; email: string; alias: string }>> {
  const response = await apiClient.get<ApiBoardsResponse>(`/Boards?page=1&per_page=10`);
  const board = response.data.items.find((b) => String(b.id) === String(boardId));
  return board?.members ?? [];
}

export async function updateBoardMemberRole(boardId: string, memberId: string, role: string): Promise<void> {
  await apiClient.put(`/Boards/${boardId}/Members/${memberId}`, { role });
}

export async function removeBoardMember(boardId: string, memberId: string): Promise<void> {
  await apiClient.delete(`/Boards/${boardId}/Members/${memberId}`);
}
