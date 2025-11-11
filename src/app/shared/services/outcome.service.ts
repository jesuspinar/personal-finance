import { Injectable, inject } from '@angular/core';
import { OfflineDbService } from './offline-db.service';
import { PaginationService } from './pagination.service';
import { Outcome } from '../models/outcome.model';

@Injectable({ providedIn: 'root' })
export class OutcomeService {
  private readonly db = inject(OfflineDbService);
  readonly pagination = inject(PaginationService<Outcome>);

  async loadAll(): Promise<void> {
    const items = await this.db.outcomes.toArray();
    this.pagination.setItems(items);
  }

  async delete(id: number): Promise<void> {
    await this.db.outcomes.delete(id);
    this.pagination.items.update(items => items.filter(item => item.id !== id));

    const total = this.pagination.totalPages();
    if (this.pagination.currentPage() > total) {
      this.pagination.currentPage.set(total || 1);
    }
  }

  async add(outcome: Outcome): Promise<void> {
    await this.db.outcomes.add(outcome);
    await this.loadAll();
  }

  async update(outcome: Outcome): Promise<void> {
    if (!outcome.id) throw new Error('Cannot update outcome without id');
    await this.db.outcomes.put(outcome);
    await this.loadAll();
  }

  async getById(id: number) {
    return this.db.outcomes.get(id);
  }
}
