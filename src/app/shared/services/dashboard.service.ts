import { inject, Injectable } from '@angular/core';
import { OfflineDbService } from './offline-db.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private db = inject(OfflineDbService);

  async getTotals() {
    const records = await this.db.records.toArray();

    const incomeTotal = records
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0);

    const outcomeTotal = records
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);

    const balance = incomeTotal - outcomeTotal;

    return { incomeTotal, outcomeTotal, balance };
  }

  async getMonthlyStats(year: number, month: number) {
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);

    const records = await this.db.records
      .filter(r => {
        const d = new Date(r.date);
        return d >= start && d <= end;
      })
      .toArray();

    const monthlyIncome = records
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0);

    const monthlyOutcome = records
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);

    return { monthlyIncome, monthlyOutcome };
  }
}
