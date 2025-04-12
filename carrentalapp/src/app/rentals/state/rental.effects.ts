import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RentalActionGroup } from './rental.actions';
import { RentalService } from '../services/rental.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RentalEffects {

  actions$ = inject(Actions);
  rentalService = inject(RentalService)

  getAvailableCars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RentalActionGroup.tryRentCar),
      switchMap(({ data }) =>
        this.rentalService
            .rentCar(data)
            .pipe(
                map((rental) => RentalActionGroup.rentCarSuccess({ rental })),
                catchError(
                    (err: HttpErrorResponse) => {
                        const message = typeof err.error === 'string' ? err.error : 'An unexpected error occurred';
                        return of(RentalActionGroup.rentCarFailure({ error: message }));
                      }
                )
            )
      )
    )
  );
}