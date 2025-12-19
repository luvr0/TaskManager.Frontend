import type { Card } from '@/types/card';
import type { ApiCardItem, ApiCardsResponse } from '@/types/api';
import { mapCardStatus } from '@/lib/statusMapper';

export function mapApiCardToCard(apiCard: ApiCardItem): Card {
  return {
    id: String(apiCard.id),
    title: apiCard.title,
    description: apiCard.description,
    status: mapCardStatus(apiCard.status),
    columnId: String(apiCard.columnId),
    order: apiCard.order,
  };
}

export function mapApiCardsResponse(apiResponse: ApiCardsResponse) {
  return {
    cards: apiResponse.items.map(mapApiCardToCard),
    total: apiResponse.totalCount,
    page: apiResponse.page,
    per_page: apiResponse.perPage,
  };
}
