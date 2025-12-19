export type CardStatus = 'Pending' | 'Done' | 'Incomplete';

export interface Card {
  id: string;
  title: string;
  description?: string;
  status: CardStatus;
  columnId: string;
  order: number;
}
