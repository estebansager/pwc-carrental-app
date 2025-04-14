import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { CarServicesService } from '../services/car-services.service';
import { ServicesActionGroup } from './services.actions';

@Injectable()
export class ServicesEffects {

  actions$ = inject(Actions);
  carServicesService = inject(CarServicesService)

  getAvailableCars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServicesActionGroup.getScheduledServices),
      switchMap(() =>
        this.carServicesService
            .getScheduledServices()
            .pipe(
                map((services) => ServicesActionGroup.scheduledServicesSuccess({ services })),
                catchError(
                    (err: HttpErrorResponse) => {
                        const message = typeof err.error === 'string' ? err.error : 'An unexpected error occurred';
                        return of(ServicesActionGroup.scheduledServicesFailure({ error: message }));
                      }
                )
            )
      )
    )
  );
}