import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Operator, OperatorFilters } from '../../data/models/operator/operator.model';
import { PaginatedResult } from '../../data/interface/pagination/pagination.interface';
import { filterOperators } from '../../data/filter/operator/operator-filters';
import { createPaginationResult } from '../../data/utils/pagination/pagination.utils';

@Injectable({
  providedIn: 'root' // Fournit le service à toute l'application
})
export class OperatorService {

  private readonly allMaxLevelByRarityAndElite: { [keyRarity: number]: { [keyElite: number]: number } } = {
    1: { 0: 30 },                   // Rarity 1 with Elite 0 has a max level of 30
    2: { 0: 30 },                   // Rarity 2 with Elite 0 has a max level of 30
    3: { 0: 40, 1: 55 },            // Rarity 3 has Elite 0 with 40, Elite 1 with 55
    4: { 0: 45, 1: 60, 2: 70 },     // Rarity 4 has three levels: 45, 60, 70
    5: { 0: 50, 1: 70, 2: 80 },     // Rarity 5 max levels for Elite 0, 1, 2
    6: { 0: 50, 1: 80, 2: 90 },     // Rarity 6 max levels for Elite 0, 1, 2
  };


  // URL de l'API des opérateurs
  private apiUrl = 'http://localhost:3000/operators';

  // Cache pour stocker localement les opérateurs chargés
  private operatorCache: Operator[] = [];

  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste des opérateurs depuis le cache ou via une requête HTTP.
   * @returns Observable contenant la liste des opérateurs.
   */
  getOperators(): Observable<Operator[]> {
      // Si les données sont en cache, les retourne sous forme d'Observable.
      if (this.operatorCache.length > 0) {
        return of(this.operatorCache);
      }

    // Sinon, effectue une requête HTTP pour récupérer les données.
    return this.http.get<Operator[]>(this.apiUrl).pipe(
      // Stocke les données dans le cache local.
      tap(data => {
        this.operatorCache = data;
      }),
      catchError(this.handleError) // Gestion des erreurs.
    );
  }

  /**
   * Récupère un opérateur spécifique par son ID.
   * @param id Identifiant de l'opérateur.
   * @returns Observable contenant l'opérateur correspondant ou undefined s'il n'est pas trouvé.
   */
  getOperatorById(id: number): Observable<Operator | undefined> {
    const cachedOperator = this.operatorCache.find(op => op.id === id);
    if (cachedOperator) {
      return of(cachedOperator);
    }

    return this.http.get<Operator>(`${this.apiUrl}/${id}`).pipe(
      // Handle errors.
      catchError(this.handleError)
    );
  }

  /**
   * Gère les erreurs HTTP.
   * @param error Objet contenant les détails de l'erreur.
   * @returns Observable avec un message d'erreur.
   */
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  /**
   * Récupère les opérateurs paginés selon les filtres appliqués.
   * @param filters Filtres à appliquer (recherche, rareté, pagination, etc.).
   * @returns Résultat paginé des opérateurs.
   */
  getPaginatedoperators(filters: OperatorFilters):  Observable<PaginatedResult<Operator>> {
    return this.getOperators().pipe(
      // Filter the operators based on the specified criteria.
      map(() => {
        const filteredOperators = filterOperators(this.operatorCache, filters);
        return createPaginationResult(
          this.operatorCache,
          { currentPage: filters.page, pageSize: filters.pageSize, totalItems: filteredOperators.length },
          filteredOperators
        );
      }),
      // Handle errors.
      catchError(this.handleError)
    );
  }

  /**
   * Fetches all unique classes of operators.
   * @returns Observable containing the list of unique classes.
   */
  getAllClasses(): Observable<string[]> {
    return this.getOperators().pipe(
      // Extract unique classes from the cached operators and sort them.
      map(operators => {
        const classes = [...new Set(operators.map(op => op.class))].sort();
        return classes;
      }),
      // Handle errors.
      catchError(this.handleError)
    );
  }

  getMaxLevelByRarityAndElite(rarity: number, elite: number): number {
    return this.allMaxLevelByRarityAndElite[rarity][elite] || 1; // Fallback to 1 if rarity is invalid
  }
}


