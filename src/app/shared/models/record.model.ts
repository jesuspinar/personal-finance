export interface Record {
  id?: number;
  amount: number;
  details: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
}
