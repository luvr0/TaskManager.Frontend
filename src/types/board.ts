export interface BoardMember {
  initials: string;
  color?: string;
}

export interface BoardStats {
  columnsCount: number;
  cardsCount: number;
}

export interface Board {
  id: string;
  title: string;
  members: BoardMember[];
  stats: BoardStats;
}

export type BoardData = Board;
export type Member = BoardMember;
