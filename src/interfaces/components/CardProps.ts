export interface CardProps {
  card: {
    id: string;
    title: string;
    description?: string;
    status: 'Pending' | 'Done' | 'Incomplete';
    columnId: string;
    order: number;
  };
  onEdit?: () => void;
  onDelete?: () => void;
}
