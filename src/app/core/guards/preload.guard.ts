import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { OperatorService } from '../services/operator.service';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export const preloadGuard: CanActivateFn = (route, state) => {
  const operatorService = inject(OperatorService);

  console.log('PreloadGuard invoked for:', state.url);

  return operatorService.getOperators().pipe(
    tap((operators) => {
      if (operators && operators.length > 0) {
        console.log('Preloading successful, data loaded:', operators);
      } else {
        console.warn('Preloading completed but no data found.');
      }
    }),
    catchError((err) => {
      console.error('Error preloading operators:', err);
      return of(null); // Continue navigation despite the error
    }),
    // Always return true to allow navigation
    () => of(true)
  );
};
