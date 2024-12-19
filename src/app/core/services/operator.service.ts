import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Operator, OperatorFilters } from '../../data/models/operator/operator.model';
import { PaginatedResult } from '../../data/interface/pagination/pagination.interface';
import { filterOperators } from '../../data/filter/operator/operator-filters';
import { createPaginationResult } from '../../data/utils/pagination/pagination.utils';
@Injectable({
  providedIn: 'root'
})
export class OperatorService {


  private apiUrl = 'http://localhost:3000/operators';

  private operatorCache!: Operator[];


  constructor(private http: HttpClient) { }


  getOperators(): Observable<Operator[]> {
    if (this.operatorCache) {
      
      return of(this.operatorCache); // Return in-memory cached data
    }
    
    return this.http.get<Operator[]>(this.apiUrl).pipe(
      map(operators => operators.sort((a, b) => a.rarity - b.rarity)), //sort in low to high rarity
      tap(data => this.operatorCache = data), // Store in memory
      catchError(this.handleError)
    );
  }

  getOperatorById(id: number): Observable<Operator | undefined> {
    return this.http.get<Operator>(`${this.apiUrl}/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  getPaginatedoperators(filters: OperatorFilters): PaginatedResult<Operator>{
    const filteredOperators = filterOperators(this.operatorCache, filters);

    return createPaginationResult(this.operatorCache, {currentPage: filters.page, pageSize: filters.pageSize, totalItems: filteredOperators.length},filteredOperators);
  }  
}