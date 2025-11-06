import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Income } from './shared/models/income.model';
import { Outcome } from './shared/models/outcome.model';


@Injectable({ providedIn: 'root' })
export class OfflineDbService extends Dexie {
  incomes!: Dexie.Table<Income, number>;
  outcomes!: Dexie.Table<Outcome, number>;

  constructor() {
    super('PersonalFinanceDB');
    this.version(1).stores({
      incomes: '++id, description, date, amount',
      outcomes: '++id, description, date, amount'
    });
  }
}
