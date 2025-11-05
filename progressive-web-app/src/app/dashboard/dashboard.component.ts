import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  incomeTotal = 0;
  outcomeTotal = 0;
  balance = 0;
  monthlyIncome = 0;
  monthlyOutcome = 0;

  ngOnInit(): void {
    // This would normally fetch data from the SQLite database
    this.fetchFinancialData();
  }

  private fetchFinancialData(): void {
    // Simulate database fetch
    this.incomeTotal = 15000;
    this.outcomeTotal = 12000;
    this.balance = this.incomeTotal - this.outcomeTotal;
    this.monthlyIncome = this.incomeTotal / 12;
    this.monthlyOutcome = this.outcomeTotal / 12;
  }
}