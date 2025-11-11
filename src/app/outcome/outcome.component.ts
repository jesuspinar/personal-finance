import { Component, inject } from '@angular/core';
import { OutcomeService } from '../shared/services/outcome.service';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from "../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.css'],
  imports: [RouterLink, PaginationComponent]
})
export class OutcomeComponent {
  private readonly outcomeService = inject(OutcomeService);
  pagination = this.outcomeService.pagination;

  ngOnInit(): void {
    this.outcomeService.loadAll();
  }

  deleteOutcomeItem(id: number | undefined): void {
    if (!id) return;
    this.outcomeService.delete(id);
  }
}
