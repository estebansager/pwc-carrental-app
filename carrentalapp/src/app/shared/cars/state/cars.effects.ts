import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CarService } from "../services/car.service";
import { CarModelsActionGroup, CarTypesActionGroup } from "./cars.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class CarEffects {

  actions$ = inject(Actions);
  carService = inject(CarService);

  getCarTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarTypesActionGroup.getCarTypes),
      switchMap(() =>
        this.carService.getCarTypes().pipe(
          map((types) => CarTypesActionGroup.getCarTypesSuccess({ types })),
          catchError((err) => of(CarTypesActionGroup.getCarTypesFailure({ error: err.message })))
        )
      )
    )
  );

  getCarModels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarModelsActionGroup.getCarModels),
      switchMap(() =>
        this.carService.getCarModels().pipe(
          map((models) => CarModelsActionGroup.getCarModelsSuccess({ models })),
          catchError((err) => of(CarModelsActionGroup.getCarModelsFailure({ error: err.message })))
        )
      )
    )
  );
}