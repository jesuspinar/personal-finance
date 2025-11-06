import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OfflineDbService } from '../offline-db.service';
import { Income } from '../shared/models/income.model';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  standalone: true,
  imports: [RouterLink]
})
export class IncomeComponent implements OnInit {
  private readonly db = inject(OfflineDbService);
  incomeItems = signal<Income[]>([]);

  ngOnInit(): void {
    this.db.incomes.toArray().then(items => this.incomeItems.set(items));
  }
}
