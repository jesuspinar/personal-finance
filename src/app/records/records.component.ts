import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationComponent } from "../shared/components/pagination/pagination.component";
import { RecordService } from '../shared/services/record.service';
import { Record } from '../shared/models/record.model';


@Component({
  selector: 'app-records',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly recordService = inject(RecordService);
  readonly pagination = this.recordService.pagination;
  title = ''

  ngOnInit(): void {
    const type = this.router.url.includes('income') ? 'income' : 'expense'
    this.title = type;
    this.recordService.loadByType(type);
  }

  deleteIncomeItem(id: number | undefined): void {
    if (!id) return;
    this.recordService.delete(id);
  }

  handleAddRedirect() {
    switch (this.title) {
      case 'income':
        this.router.navigate(['income', 'add-income'])
        break;
      case 'expense':
        this.router.navigate(['expense', 'add-expense'])
        break;
      default:
        break;
    }
  }
  
  handleEditRedirect(row: Record) {
    switch (row.type) {
      case 'income':
        this.router.navigate(['income', 'edit-income'], { queryParams: { id: row.id } })
        break;
      case 'expense':
        this.router.navigate(['expense', 'edit-expense'], { queryParams: { id: row.id } })
        break;
      default:
        break;
    }
  }
}
