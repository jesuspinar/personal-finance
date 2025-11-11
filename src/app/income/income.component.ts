import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IncomeService } from '../shared/services/income.service';
import { PaginationComponent } from "../shared/components/pagination/pagination.component";


@Component({
  selector: 'app-income',
  standalone: true,
  imports: [RouterLink, PaginationComponent],
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  private readonly incomeService = inject(IncomeService);
  pagination = this.incomeService.pagination;

  ngOnInit(): void {
    this.incomeService.loadAll();
  }

  deleteIncomeItem(id: number | undefined): void {
    if (!id) return;
    this.incomeService.delete(id);
  }
}
