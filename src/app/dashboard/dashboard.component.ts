import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../shared/services/dashboard.service';
import { DecimalPipe } from '@angular/common';
import { CsvDataService } from '../shared/services/csv-data.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [DecimalPipe, ReactiveFormsModule]
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private readonly csvService = inject(CsvDataService);
  private readonly fb = inject(FormBuilder);

  fileForm!: FormGroup;

  incomeTotal = 0;
  outcomeTotal = 0;
  balance = 0;
  monthlyIncome = 0;
  monthlyOutcome = 0;

  async ngOnInit() {
    this.fileForm = this.fb.group({
      file: [null]
    });

    const now = new Date();
    const { incomeTotal, outcomeTotal, balance } = await this.dashboardService.getTotals();
    const { monthlyIncome, monthlyOutcome } = await this.dashboardService.getMonthlyStats(
      now.getFullYear(),
      now.getMonth()
    );

    this.incomeTotal = incomeTotal;
    this.outcomeTotal = outcomeTotal;
    this.balance = balance;
    this.monthlyIncome = monthlyIncome;
    this.monthlyOutcome = monthlyOutcome;
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const text = await file.text();
    await this.csvService.importCsv(text);

    // force UI refresh
    await this.ngOnInit();
  }

  onImport() {
    const input: HTMLInputElement = document.querySelector('#fileInput')!;
    input.click();
  }

  async onExport() {
    const csv = await this.csvService.exportAllToCsv();
    if (!csv) return;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'personal_finance_export.csv';
    a.click();

    URL.revokeObjectURL(url);
  }
}
