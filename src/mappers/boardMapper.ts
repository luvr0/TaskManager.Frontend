import type { Board } from '@/types/board';
import type { Column } from '@/types/column';
import type {
  ApiBoardItem,
  ApiBoardsResponse,
  ApiBoardComplete
} from '@/types/api';
import { mapCardStatus } from '@/lib/statusMapper';

export function mapApiBoardToBoard(apiBoard: ApiBoardItem): Board {
  return {
    id: String(apiBoard.id),
    title: apiBoard.name,
    stats: {
      columnsCount: 0,
      cardsCount: 0,
    },
    members: apiBoard.members.map((member) => ({
      initials: member.alias,
      color: 'primary.main',
    })),
  };
}

export function mapApiBoardsResponse(apiResponse: ApiBoardsResponse) {
  return {
    boards: apiResponse.items.map(mapApiBoardToBoard),
    total: apiResponse.totalCount,
    page: apiResponse.page,
    per_page: apiResponse.perPage,
  };
}

export function mapApiBoardCompleteToColumns(apiBoard: ApiBoardComplete): Column[] {
  return apiBoard.columns.map((apiColumn) => ({
    id: String(apiColumn.id),
    title: apiColumn.name,
    order: apiColumn.order,
    cards: apiColumn.cards.map((apiCard) => ({
      id: String(apiCard.id),
      title: apiCard.title,
      description: apiCard.description,
      status: mapCardStatus(apiCard.status),
      columnId: String(apiColumn.id),
      order: apiCard.order,
    })),
  }));
}
