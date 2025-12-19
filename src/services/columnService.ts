import { apiClient } from './apiClient';
import type { Column } from '@/types/column';
import type { ApiColumnsResponse } from '@/types/api';
import type { ColumnsListParams, ColumnsListResponse } from '@/types/services';
import { mapApiColumnsResponse } from '@/mappers/columnMapper';

export async function fetchColumns(
  boardId: string,
  params?: ColumnsListParams
): Promise<ColumnsListResponse> {
  const queryParams = new URLSearchParams({
    page: String(params?.page || 1),
    per_page: String(params?.per_page || 10),
  })

  const response = await apiClient.get<ApiColumnsResponse>(
    `/Boards/${boardId}/Columns?${queryParams.toString()}`
  )
  return mapApiColumnsResponse(response.data)
}

export async function createColumn(boardId: string, title: string): Promise<void> {
  await apiClient.post(`/Boards/${boardId}/Columns`, { 
    name: title 
  })
}

export async function updateColumn(
  boardId: string,
  columnId: string,
  data: { name: string }
): Promise<Column> {
  const response = await apiClient.put<Column>(
    `/Boards/${boardId}/Columns/${columnId}`,
    data
  )
  return response.data
}

export async function deleteColumn(boardId: string, columnId: string): Promise<void> {
  await apiClient.delete(`/Boards/${boardId}/Columns/${columnId}`)
}
