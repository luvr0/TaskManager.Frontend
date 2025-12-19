export interface ApiCardItem {
  id: number;
  title: string;
  description?: string;
  status: string;
  columnId: number;
  order: number;
}

export interface ApiCardsResponse {
  items: ApiCardItem[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}
