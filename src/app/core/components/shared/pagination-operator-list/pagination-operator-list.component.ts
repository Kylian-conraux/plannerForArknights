import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-pagination-operator-list',
  imports: [NgFor, NgIf],
  templateUrl: './pagination-operator-list.component.html',
  styleUrl: './pagination-operator-list.component.scss'
})
export class PaginationOperatorListComponent {
  // Entrée pour la page actuelle active (par défaut : 1)
  @Input() currentPage: number = 1;

  // Entrée pour le nombre total de pages (par défaut : 1)
  @Input() totalPages: number = 1;

  // Événement déclenché lorsque la page change
  @Output() pageChange = new EventEmitter<number>();

  /**
   * Getter pour les pages visibles dans le composant de pagination.
   * Calcule une plage de pages à afficher (jusqu'à un maximum de 5 pages).
   */
  get visiblePages(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    // Début de la plage : 2 pages avant la page actuelle, sans descendre en dessous de 1
    let start = Math.max(1, this.currentPage - 2);

    // Fin de la plage : garantir qu'au maximum maxVisiblePages sont affichées, plafonné au totalPages
    let end = Math.min(this.totalPages, start + maxVisiblePages - 1);

    // Ajuster 'start' si le nombre de pages est inférieur à maxVisiblePages
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    // Générer la plage des pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  /**
   * Gère l'événement de changement de page.
   * Vérifie que la nouvelle page est valide avant de déclencher l'événement.
   * @param page - Le numéro de la page vers laquelle naviguer.
   */
  onPageChange(page: number): void {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
