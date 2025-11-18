import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Income } from '../models/income.model';
import { Outcome } from '../models/outcome.model';


@Injectable({ providedIn: 'root' })
export class OfflineDbService extends Dexie {
  incomes!: Dexie.Table<Income, number>;
  outcomes!: Dexie.Table<Outcome, number>;

  constructor() {
    super('PersonalFinanceDB');
    this.version(1).stores({
      incomes: '++id, details, date, amount',
      outcomes: '++id, details, date, amount'
    });
  }
}
