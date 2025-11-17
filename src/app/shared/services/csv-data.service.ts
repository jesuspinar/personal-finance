import { inject, Injectable } from '@angular/core';
import { OfflineDbService } from './offline-db.service';

@Injectable({ providedIn: 'root' })
export class CsvDataService {

  private readonly db = inject(OfflineDbService);


  async exportAllToCsv(): Promise<string> {
    const incomes = await this.db.incomes.toArray();
    const outcomes = await this.db.outcomes.toArray();

    const combined = [
      ...incomes.map(i => ({ ...i, type: 'income' })),
      ...outcomes.map(o => ({ ...o, type: 'outcome' }))
    ];

    if (!combined.length) return '';

    const headers = Object.keys(combined[0]);

    const csvRows = [
      headers.join(','),
      ...combined.map(row =>
        headers.map(h => JSON.stringify((row as any)[h] ?? '')).join(',')
      )
    ];

    return csvRows.join('\n');
  }


  async importCsv(csvText: string) {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return;

    const headers = lines[0].split(',').map(h => h.trim());

    const rows = lines.slice(1).map(line => {
      const values = this.parseCsvLine(line);
      const obj: any = {};
      headers.forEach((h, i) => (obj[h] = values[i]));
      delete obj.id;
      return obj;
    });

    const incomes = rows.filter(r => r.type === 'income');
    const outcomes = rows.filter(r => r.type === 'outcome');

    if (incomes.length) {
      await this.db.incomes.bulkAdd(
        incomes.map(i => {
          const { type, ...data } = i;
          return data;
        })
      );
    }

    if (outcomes.length) {
      await this.db.outcomes.bulkAdd(
        outcomes.map(o => {
          const { type, ...data } = o;
          return data;
        })
      );
    }
  }


  private parseCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
        continue;
      }
      if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current.trim());
    return result;
  }
}
