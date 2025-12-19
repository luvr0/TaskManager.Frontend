
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  expiresIn: number;
}


export interface BoardsListParams {
  page?: number;
  per_page?: number;
}

export interface BoardsListResponse {
  boards: Array<{
    id: string;
    title: string;
    members: Array<{ initials: string; color?: string }>;
    stats: { columnsCount: number; cardsCount: number };
  }>;
  total: number;
  page: number;
  per_page: number;
}


export interface CardsListParams {
  page?: number;
  per_page?: number;
}

export interface CardsListResponse {
  cards: Array<{
    id: string;
    title: string;
    description?: string;
    status: string;
    columnId: string;
    order: number;
  }>;
  total: number;
  page: number;
  per_page: number;
}


export interface ColumnsListParams {
  page?: number;
  per_page?: number;
}

export interface ColumnsListResponse {
  columns: Array<{
    id: string;
    title: string;
    order: number;
  }>;
  total: number;
  page: number;
  per_page: number;
}
