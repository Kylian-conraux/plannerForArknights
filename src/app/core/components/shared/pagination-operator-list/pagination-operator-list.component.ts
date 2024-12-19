import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-pagination-operator-list',
  imports: [NgFor, NgIf],
  templateUrl: './pagination-operator-list.component.html',
  styleUrl: './pagination-operator-list.component.scss'
})
export class PaginationOperatorListComponent {
  // Input for the current active page (default: 1)
  @Input() currentPage: number = 1;

  // Input for the total number of pages (default: 1)
  @Input() totalPages: number = 1;

  // EventEmitter that triggers when the page changes
  @Output() pageChange = new EventEmitter<number>();

  /**
   * Getter for the visible pages in the pagination component.
   * It calculates a range of pages to show (up to a max of 5 pages).
   */
  get visiblePages(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    // Start range: 2 pages before the current page, but not below 1
    let start = Math.max(1, this.currentPage - 2);

    // End range: Ensure at most maxVisiblePages are shown, capped at totalPages
    let end = Math.min(this.totalPages, start + maxVisiblePages - 1);

    // Adjust 'start' if the number of pages is less than maxVisiblePages
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    // Generate the page range
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  /**
   * Handles the page change event.
   * Ensures the new page is valid before emitting the event.
   * @param page - The page number to navigate to.
   */
  onPageChange(page: number): void {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
