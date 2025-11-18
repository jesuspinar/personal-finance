import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationComponent } from "../shared/components/pagination/pagination.component";
import { RecordService } from '../shared/services/record.service';
import { Record } from '../shared/models/record.model';
import { ROUTES } from '../shared/utils/routes';


@Component({
  selector: 'app-records',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  private readonly routes = ROUTES;
  private readonly router = inject(Router);
  private readonly recordService = inject(RecordService);
  readonly pagination = this.recordService.pagination;
  title = ''

  ngOnInit(): void {
    const type = this.router.url.includes(this.routes.INCOME) ? this.routes.INCOME : this.routes.EXPENSE
    this.title = type;
    this.recordService.loadByType(type);
  }
  
  handleAddRedirect() {
    switch (this.title) {
      case this.routes.INCOME:
        this.router.navigate([this.routes.INCOME, this.routes.INCOME_ADD])
        break;
      case this.routes.EXPENSE:
        this.router.navigate([this.routes.EXPENSE, this.routes.EXPENSE_ADD])
        break;
      default:
        break;
    }
  }

  handleEditRedirect(row: Record) {
    switch (row.type) {
      case this.routes.INCOME:
        this.router.navigate([this.routes.INCOME, this.routes.INCOME_EDIT], { queryParams: { id: row.id } })
        break;
      case this.routes.EXPENSE:
        this.router.navigate([this.routes.EXPENSE, this.routes.EXPENSE_EDIT], { queryParams: { id: row.id } })
        break;
      default:
        break;
    }
  }
}
