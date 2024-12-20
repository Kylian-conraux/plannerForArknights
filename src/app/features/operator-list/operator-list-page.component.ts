import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Operator, OperatorFilters } from '../../data/models/operator/operator.model';
import { PaginatedResult } from '../../data/interface/pagination/pagination.interface';
import { OperatorService } from '../../core/services/operator.service';
import { OperatorListComponent } from '../../core/components/shared/operator-list/operator-list.component';


@Component({
  selector: 'app-operator-list-page',
  imports: [OperatorListComponent],
  templateUrl: './operator-list-page.component.html',
  styleUrl: './operator-list-page.component.scss'
})
export class OperatorListComponentPage implements OnInit {


 // Liste des opérateurs chargés
  operators: Operator[] = [];

  // Subscription pour gérer les flux d'observables et éviter les fuites de mémoire
  private subscription: Subscription = new Subscription();


  // Filtres appliqués à la liste des opérateurs
  filters: OperatorFilters = {
    searchQuery: '',
    rarity: null,
    page: 1,
    pageSize: 14
  };

   // Résultat paginé des opérateurs
  paginatedResult: PaginatedResult<Operator> = {
    items: [],
    total: 0,
    currentPage: 1,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false
  };


  constructor(private operatorService: OperatorService,
    private route: Router
  ) {

  }

  ngOnInit(): void {

    this.loadOperator();// Charge la liste simple des opérateurs
    this.loadOperators();// Charge la liste paginée des opérateurs
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Charge une liste d'opérateurs sans pagination
   */
  private loadOperator() {
    this.operatorService.getOperators().subscribe({
      next: (data) => {
        this.operators = data;
      },
      error: (err) => {
        console.error('Failed to load operators:', err);
      }
    });

  }


  /**
   * Navigue vers la page d'un opérateur spécifique
   * @param operator L'opérateur cliqué
   */
  private onTileClick(operator: Operator): void {
    this.route.navigate(['/operator', operator.id]);
  }


  /**
   * Met à jour les filtres et recharge la liste paginée des opérateurs
   * @param newFilters Les nouveaux filtres à appliquer
   */
  onFiltersChange(newFilters: OperatorFilters) {
    this.filters = {
      ...newFilters,// Fusionne les nouveaux filtres avec les filtres existants
      page: 1
    };
    this.loadOperators();
  }

  /**
   * Change la page active et recharge les opérateurs
   * @param page Numéro de la nouvelle page
   */
  onPageChange(page: number) {
    this.filters = {
      ...this.filters,
      page
    };
    this.loadOperators();
  }

   /**
   * Charge les opérateurs en fonction des filtres appliqués avec pagination
   */
  private loadOperators() {
    this.paginatedResult = this.operatorService.getPaginatedoperators(this.filters);
  }
}
