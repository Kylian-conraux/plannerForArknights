import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { OperatorService } from '../services/operator.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const preloadGuard: CanActivateFn = (route, state) => {
  const operatorService = inject(OperatorService);

  console.log('PreloadGuard invoked for:', state.url);

  // Preload data and allow or block navigation
  return operatorService.getOperators().pipe(
    map((data) => {
      console.log('Operators preloaded:', data);
      return true; // Allow navigation
    }),
    catchError((err) => {
      console.error('Error preloading operators:', err);
      return of(false); // Block navigation on error
    })
  );
};
