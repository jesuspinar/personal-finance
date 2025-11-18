import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Income } from '../models/income.model';
import { Outcome } from '../models/outcome.model';
import { Record } from '../models/record.model';


@Injectable({ providedIn: 'root' })
export class OfflineDbService extends Dexie {
  incomes!: Dexie.Table<Income, number>;
  outcomes!: Dexie.Table<Outcome, number>;
  records!: Dexie.Table<Record, number>;
  
  constructor() {
    super('PersonalFinanceDB');
    this.version(1).stores({
      incomes: '++id, details, date, amount',
      outcomes: '++id, details, date, amount',
      records: '++id, details, date, amount, type, category',
    });
  }
}
