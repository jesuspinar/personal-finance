import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../shared/services/dashboard.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [DecimalPipe]
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  incomeTotal = 0;
  outcomeTotal = 0;
  balance = 0;
  monthlyIncome = 0;
  monthlyOutcome = 0;

  async ngOnInit() {
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
}
