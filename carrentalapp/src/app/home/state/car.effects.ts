import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CarService } from '../services/car.service';
import { GetAvailableCarsActionGroup } from './car.actions';

@Injectable()
export class CarEffects {

  actions$ = inject(Actions);
  carService = inject(CarService)

  getAvailableCars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAvailableCarsActionGroup.getAvailableCars),
      switchMap(({ criteria }) =>
        this.carService
            .getAvailableCars(criteria)
            .pipe(
                map((cars) => GetAvailableCarsActionGroup.getAvailableCarsSuccess({ cars })),
                catchError((err) => of(GetAvailableCarsActionGroup.getAvailableCarsFailure({ error: err.message })))
            )
      )
    )
  );
}