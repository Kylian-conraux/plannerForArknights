import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  private apiUrl = 'http://localhost:3000/promotions';

  private promotionsCache: any[] = [];
  constructor(private http: HttpClient) { }

  getPromotions(): Observable<any[]> {
    if (this.promotionsCache.length > 0) {
      return of(this.promotionsCache);
    }

    return this.http.get<Promotion[]>(this.apiUrl).pipe(
      tap((data: Promotion[]) => {
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
