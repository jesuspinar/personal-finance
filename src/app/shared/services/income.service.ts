import { Injectable, inject } from '@angular/core';
import { OfflineDbService } from './offline-db.service';
import { PaginationService } from './pagination.service';
import { Income } from '../models/income.model';


@Injectable({ providedIn: 'root' })
export class IncomeService {
  private readonly db = inject(OfflineDbService);
  readonly pagination = inject(PaginationService<Income>);

  async loadAll(): Promise<void> {
    const items = await this.db.incomes.toArray();
    this.pagination.setItems(items);
  }

  async delete(id: number): Promise<void> {
    await this.db.incomes.delete(id);
    this.pagination.items.update(items => items.filter(item => item.id !== id));

    const total = this.pagination.totalPages();
    if (this.pagination.currentPage() > total) {
      this.pagination.currentPage.set(total || 1);
    }
  }

  async add(income: Income): Promise<void> {
    await this.db.incomes.add(income);
    await this.loadAll();
  }

  async update(income: Income): Promise<void> {
    if (!income.id) throw new Error('Cannot update income without id');
    await this.db.incomes.put(income);
    await this.loadAll();
  }
}
