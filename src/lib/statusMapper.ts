import type { CardStatus } from '@/types/card';

export function mapCardStatus(apiStatus: string): CardStatus {
  const statusMap: Record<string, CardStatus> = {
    'pending': 'Pending',
    'done': 'Done',
    'incomplete': 'Incomplete',
  };

  return statusMap[apiStatus.toLowerCase()] || 'Pending';
}
