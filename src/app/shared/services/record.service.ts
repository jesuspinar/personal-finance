import { Injectable, inject } from '@angular/core';
import { OfflineDbService } from './offline-db.service';
import { PaginationService } from './pagination.service';
import { Record } from '../models/record.model';



@Injectable({ providedIn: 'root' })
export class RecordService {
  private readonly db = inject(OfflineDbService);
  readonly pagination = inject(PaginationService<Record>);

  async loadByType(type: 'income' | 'expense'): Promise<void> {
    const items = await this.db.records.filter((obj) => obj.type === type).toArray();
    this.pagination.setItems(items);
  }

  async delete(id: number): Promise<void> {
    await this.db.records.delete(id);
    this.pagination.items.update(items => items.filter(item => item.id !== id));

    const total = this.pagination.totalPages();
    if (this.pagination.currentPage() > total) {
      this.pagination.currentPage.set(total || 1);
    }
  }

  async add(record: Record): Promise<void> {
    await this.db.records.add(record);
    // await this.loadAll();
  }

  async update(record: Record): Promise<void> {
    if (!record.id) throw new Error('Cannot update record without id');
    await this.db.records.put(record);
    // await this.loadAll();
  }

  async getById(id: number) {
    return this.db.records.get(id);
  }
}
