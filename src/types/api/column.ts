export interface ApiColumnItem {
  id: number;
  name: string;
  boardId: number;
  order: number;
}

export interface ApiColumnsResponse {
  items: ApiColumnItem[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}
