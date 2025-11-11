import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaginationService<T> {
  // state signals
  items = signal<T[]>([]);
  currentPage = signal(1);
  itemsPerPage = signal(5);

  // derived signals
  paginatedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this.items().slice(start, end);
  });

  totalPages = computed(() =>
    Math.ceil(this.items().length / this.itemsPerPage())
  );

  setItems(data: T[]) {
    this.items.set(data);
    this.currentPage.set(1);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  changeItemsPerPage(value: number) {
    this.itemsPerPage.set(value);
    this.currentPage.set(1);
  }
}
