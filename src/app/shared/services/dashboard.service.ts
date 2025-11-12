import { inject, Injectable } from '@angular/core';
import { OfflineDbService } from './offline-db.service';


@Injectable({ providedIn: 'root' })
export class DashboardService {
  private db = inject(OfflineDbService);

  async getTotals() {
    const incomes = await this.db.incomes.toArray();
    const outcomes = await this.db.outcomes.toArray();

    const incomeTotal = incomes.reduce((sum, i) => sum + i.amount, 0);
    const outcomeTotal = outcomes.reduce((sum, o) => sum + o.amount, 0);
    const balance = incomeTotal - outcomeTotal;

    return { incomeTotal, outcomeTotal, balance };
  }

  async getMonthlyStats(year: number, month: number) {
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);

    const incomes = await this.db.incomes
      .filter(i => new Date(i.date) >= start && new Date(i.date) <= end)
      .toArray();

    const outcomes = await this.db.outcomes
      .filter(o => new Date(o.date) >= start && new Date(o.date) <= end)
      .toArray();

    const monthlyIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const monthlyOutcome = outcomes.reduce((sum, o) => sum + o.amount, 0);

    return { monthlyIncome, monthlyOutcome };
  }
}
