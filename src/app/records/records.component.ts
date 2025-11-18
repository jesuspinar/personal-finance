import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IncomeService } from '../shared/services/income.service';
import { PaginationComponent } from "../shared/components/pagination/pagination.component";
import { RecordService } from '../shared/services/record.service';


@Component({
  selector: 'app-records',
  standalone: true,
  imports: [RouterLink, PaginationComponent],
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly recordService = inject(RecordService);
  readonly pagination = this.recordService.pagination;

  ngOnInit(): void {
    const type = this.router.url.includes('income') ? 'income' : 'expense'
    this.recordService.loadByType(type);
  }

  deleteIncomeItem(id: number | undefined): void {
    if (!id) return;
    this.recordService.delete(id);
  }
}
