import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Operator, OperatorFilters } from '../../data/models/operator/operator.model';
import { PaginatedResult } from '../../data/interface/pagination/pagination.interface';
import { filterOperators } from '../../data/filter/operator/operator-filters';
import { createPaginationResult } from '../../data/utils/pagination/pagination.utils';

@Injectable({
  providedIn: 'root' // Fournit le service à toute l'application
})
export class OperatorService {

  // URL de l'API des opérateurs
  private apiUrl = 'http://localhost:3000/operators';

  // Cache pour stocker localement les opérateurs chargés
  private operatorCache!: Operator[];

  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste des opérateurs depuis le cache ou via une requête HTTP.
   * @returns Observable contenant la liste des opérateurs.
   */
  getOperators(): Observable<Operator[]> {
    const cachedData = localStorage.getItem('operatorCache');
    if (cachedData) {
      // Si les données sont en cache, les retourne sous forme d'Observable.
      this.operatorCache = JSON.parse(cachedData);
      return of(this.operatorCache);
    }

    // Sinon, effectue une requête HTTP pour récupérer les données.
    return this.http.get<Operator[]>(this.apiUrl).pipe(
      // Stocke les données dans le cache local et localStorage.
      tap(data => {
        this.operatorCache = data;
        localStorage.setItem('operatorCache', JSON.stringify(data));
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
    return this.http.get<Operator>(`${this.apiUrl}/${id}`);
  }

  /**
   * Vide le cache des opérateurs en mémoire et dans localStorage.
   */
  clearCache() {
    this.operatorCache = [];
    localStorage.removeItem('operatorCache');
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
  getPaginatedoperators(filters: OperatorFilters): PaginatedResult<Operator> {
    const cachedData = localStorage.getItem('operatorCache');
    if (cachedData) {
      this.operatorCache = JSON.parse(cachedData);
    }

    // Filtre les opérateurs selon les critères spécifiés.
    const filteredOperators = filterOperators(this.operatorCache, filters);

    // Crée et retourne le résultat paginé.
    return createPaginationResult(
      this.operatorCache,
      { currentPage: filters.page, pageSize: filters.pageSize, totalItems: filteredOperators.length },
      filteredOperators
    );
  }

  getAllclass(): string[] {
    const cachedData = localStorage.getItem('operatorCache');
    if(cachedData){
      this.operatorCache = JSON.parse(cachedData)
    }
    
    return [... new Set(this.operatorCache.map(op => op.class))].sort();
  }
}
