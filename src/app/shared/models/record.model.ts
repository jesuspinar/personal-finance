import { ROUTES } from "../utils/routes";

export interface Record {
  id?: number;
  amount: number;
  details: string;
  date: string;
  type: RecordType;
  category: string;
}

export type RecordType = typeof ROUTES.EXPENSE | typeof ROUTES.INCOME
