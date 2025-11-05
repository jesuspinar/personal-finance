import { Component } from '@angular/core';

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.css']
})
export class OutcomeComponent {
  outcomeItems = [
    { id: 1, description: 'Rent', amount: 2000, date: '2025-11-01' },
    { id: 2, description: 'Utilities', amount: 400, date: '2025-11-01' },
    { id: 3, description: 'Groceries', amount: 600, date: '2025-11-01' },
    { id: 4, description: 'Transportation', amount: 300, date: '2025-11-01' }
  ];
}