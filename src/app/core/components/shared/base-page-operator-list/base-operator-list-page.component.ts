import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Operator, OperatorFilters } from '../../../../data/models/operator/operator.model';
import { PaginatedResult } from '../../../../data/interface/pagination/pagination.interface';
import { OperatorService } from '../../../services/operator.service';

import { Component } from '@angular/core';

@Component({
  selector: 'app-base-operator-list-page',
  template: ''
})
/**
 * Composant de base pour la gestion des opérateurs dans Arknights.
 * Ce composant est abstrait et doit être étendu par d'autres composants.
 * Il gère le chargement des opérateurs et la pagination.
 * 
 * @abstract
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
export abstract class BaseOperatorListPageComponent implements OnInit, OnDestroy {

  /**
   * Liste des opérateurs chargés.
   * @type {Operator[]}
   */
  operators: Operator[] = [];

  /**
   * Subscription pour gérer les abonnements aux observables.
   * @private
   * @type {Subscription}
   */
  private subscription: Subscription = new Subscription();

  /**
   * Filtres appliqués pour la recherche et la pagination des opérateurs.
   * @type {OperatorFilters}
   */
  filters: OperatorFilters = {
    searchQuery: '',
    rarity: null,
    page: 1,
    pageSize: 10
  };

  /**
   * Résultat paginé des opérateurs.
   * @type {PaginatedResult<Operator>}
   */
  paginatedResult: PaginatedResult<Operator> = {
    items: [],
    total: 0,
    currentPage: 1,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false
  };

  /**
   * Constructeur du composant.
   * @param {OperatorService} operatorService - Service pour gérer les opérateurs.
   */
  constructor(private operatorService: OperatorService) { }

  /**
   * Méthode appelée lors de l'initialisation du composant.
   * Charge les opérateurs et les résultats paginés.
   */
  ngOnInit(): void {
    this.operatorService.getOperators().subscribe({
      next: (data) => {
        this.operators = data;
        this.loadOperators();
      },
      error: (err) => {
        console.error('Failed to load operators:', err);
      }
    });
    
  }

  /**
   * Méthode appelée lors de la destruction du composant.
   * Désabonne de toutes les subscriptions.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Charge les opérateurs paginés en fonction des filtres appliqués.
   * @private
   */
  private loadOperators() {
    this.operatorService.getPaginatedoperators(this.filters).subscribe({
      next: (data) => {
        this.paginatedResult = data;
      },
      error: (err) => {
        console.error('Failed to load paginated operators:', err);
      }
    });
  }

  /**
   * Méthode abstraite à implémenter pour gérer le clic sur une tuile d'opérateur.
   * @abstract
   * @param {Operator} operator - L'opérateur sur lequel on a cliqué.
   */
  abstract onTileClick(operator: Operator): void;

  /**
   * Méthode appelée lors du changement des filtres.
   * Met à jour les filtres et recharge les opérateurs paginés.
   * @param {OperatorFilters} newFilters - Les nouveaux filtres appliqués.
   */
  onFiltersChange(newFilters: OperatorFilters) {
    this.filters = {
      ...newFilters,
      page: 1
    };
    this.loadOperators();
  }

  /**
   * Méthode appelée lors du changement de page.
   * Met à jour la page actuelle et recharge les opérateurs paginés.
   * @param {number} page - Le numéro de la nouvelle page.
   */
  onPageChange(page: number) {
    this.filters = {
      ...this.filters,
      page
    };
    this.loadOperators();
  }
}