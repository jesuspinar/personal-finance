import { Component, input } from '@angular/core';
import { PaginationService } from '../../services/pagination.service';


@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent<T> {

  pagination = input.required<PaginationService<T>>();

  changePage(page: number): void {
    this.pagination().changePage(page);
  }

  changeItemsPerPage(value: number): void {
    this.pagination().changeItemsPerPage(+value);
  }
}
