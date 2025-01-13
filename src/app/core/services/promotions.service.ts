import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { PromotionCost } from '../../data/models/promotion/promotion.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  private apiUrl = 'http://localhost:3000/promotions';

  private promotionsCache: PromotionCost[] = [];
  constructor(private http: HttpClient) { }

  getPromotions(): Observable<PromotionCost[]> {
    if (this.promotionsCache.length > 0) {
      return of(this.promotionsCache);
    }

    return this.http.get<PromotionCost[]>(this.apiUrl).pipe(
      tap((data: PromotionCost[]) => {
        this.promotionsCache = data;
      }),
      catchError(this.handleError)  
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  } 
}
