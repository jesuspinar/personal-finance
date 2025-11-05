import { Component } from '@angular/core';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent {
  incomeItems = [
    { id: 1, description: 'Salary', amount: 15000, date: '2025-11-01' },
    { id: 2, description: 'Freelance', amount: 3000, date: '2025-10-15' },
    { id: 3, description: 'Investments', amount: 1000, date: '2025-10-01' }
  ];
}