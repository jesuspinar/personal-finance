import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Record } from '../models/record.model';

@Injectable({ providedIn: 'root' })
export class OfflineDbService extends Dexie {
  records!: Dexie.Table<Record, number>;

  constructor() {
    super('PersonalFinanceDB');
    this.version(1).stores({
      records: '++id, details, date, amount, type, category',
    });
  }
}
