import type { Card } from './card';

export interface Column {
  id: string;
  title: string;
  cards: Card[];
  order: number;
}
