import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ReportingService } from '../services/reporting.service';
import { MostRentedCarsActionGroup } from './reporting.actions';

@Injectable()
export class ReportingEffects {

  actions$ = inject(Actions);
  reportingService = inject(ReportingService)

  getAvailableCars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MostRentedCarsActionGroup.getMostRentedCars),
      switchMap((action) =>
        this.reportingService
            .getMostRentedCar(action.from, action.to)
            .pipe(
                map((car) => MostRentedCarsActionGroup.mostRentedCarsSuccess({ car })),
                catchError(
                    (err: HttpErrorResponse) => {
                        const message = typeof err.error === 'string' ? err.error : 'An unexpected error occurred';
                        return of(MostRentedCarsActionGroup.mostRentedCarsFailure({ error: message }));
                      }
                )
            )
      )
    )
  );
}