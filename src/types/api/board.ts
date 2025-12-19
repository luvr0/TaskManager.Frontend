export interface ApiBoardMemberItem {
  userId: number;
  role: string;
  email: string;
  alias: string;
}

export interface ApiBoardItem {
  id: number;
  name: string;
  ownerId: number;
  memberCount: number;
  members: ApiBoardMemberItem[];
}

export interface ApiBoardsResponse {
  items: ApiBoardItem[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}

export interface ApiMember {
  id: number;
  name: string;
}

export interface ApiCard {
  id: number;
  title: string;
  description?: string;
  order: number;
  status: string;
}

export interface ApiColumn {
  id: number;
  name: string;
  order: number;
  cards: ApiCard[];
}

export interface ApiBoardComplete {
  id: number;
  name: string;
  ownerId: number;
  members: ApiMember[];
  columns: ApiColumn[];
}
