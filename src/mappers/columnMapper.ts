import type { Column } from '@/types/column';
import type { ApiColumnItem, ApiColumnsResponse } from '@/types/api';

export function mapApiColumnToColumn(apiColumn: ApiColumnItem): Omit<Column, 'cards'> {
  return {
    id: String(apiColumn.id),
    title: apiColumn.name,
    order: apiColumn.order,
  };
}

export function mapApiColumnsResponse(apiResponse: ApiColumnsResponse) {
  return {
    columns: apiResponse.items.map(mapApiColumnToColumn),
    total: apiResponse.totalCount,
    page: apiResponse.page,
    per_page: apiResponse.perPage,
  };
}
