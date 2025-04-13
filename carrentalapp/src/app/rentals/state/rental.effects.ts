import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CancelRentalActionGroup, GetRentalActionGroup, ModifyRentalActionGroup, RentalActionGroup, RentalListActionGroup } from './rental.actions';
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

  getRentals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RentalListActionGroup.tryGetRentals),
      switchMap(() =>
        this.rentalService
            .getRentals()
            .pipe(
                map((rentals) => RentalListActionGroup.getRentalsSuccess({ rentals })),
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

  getRental$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetRentalActionGroup.tryGetRental),
      switchMap(({rentalId}) =>
        this.rentalService
            .getRental(rentalId)
            .pipe(
                map((rental) => GetRentalActionGroup.getRentalSuccess({ rental })),
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




  cancelRental$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CancelRentalActionGroup.tryCancelRental),
      switchMap(({rentalId}) =>
        this.rentalService
            .cancelRental(rentalId)
            .pipe(
                map(() => CancelRentalActionGroup.cancelRentalSuccess({ rentalId })),
                catchError(
                    (err: HttpErrorResponse) => {
                        const message = typeof err.error === 'string' ? err.error : 'An unexpected error occurred';
                        return of(CancelRentalActionGroup.cancelRentalFailure({ error: message }));
                      }
                )
            )
      )
    )
  )

    modifyRental$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ModifyRentalActionGroup.tryModifyRental),
        switchMap(({modifyRentalIn}) =>
          this.rentalService
              .modifyRental(modifyRentalIn.rentalId, modifyRentalIn.carType, modifyRentalIn.carModel, modifyRentalIn.startDate, modifyRentalIn.endDate)
              .pipe(
                  map((rental) => ModifyRentalActionGroup.modifyRentalSuccess({ rental })),
                  catchError(
                      (err: HttpErrorResponse) => {
                          const message = typeof err.error === 'string' ? err.error : 'An unexpected error occurred';
                          return of(ModifyRentalActionGroup.modifyRentalFailure({ error: message }));
                        }
                  )
              )
        )
      )
    );
}