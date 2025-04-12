import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Car } from '../models/car.model';
import { GetAvailableCarsActionGroup } from './car.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface CarState extends EntityState<Car>{
  loading: boolean;
}

export const carAdapter: EntityAdapter<Car> = createEntityAdapter<Car>();

export const initialState: CarState = carAdapter.getInitialState({
  loading: false
});

export const carReducerKey = 'cars';
export const carFeatureSelector = createFeatureSelector<CarState>(carReducerKey);
export const availableCarsSelector = createSelector(carFeatureSelector, carAdapter.getSelectors().selectAll)
export const carsLoadingSelector = createSelector(carFeatureSelector, (state: CarState) => state.loading);

export const carReducer = createReducer(
  initialState,

  on(GetAvailableCarsActionGroup.getAvailableCars, (state) => ({
    ...state,
    loading: true
  })),

  on(GetAvailableCarsActionGroup.getAvailableCarsSuccess, (state, { cars }) => {
    return carAdapter.setAll(cars, {...state, loading: false});
  }),

  on(GetAvailableCarsActionGroup.getAvailableCarsFailure, (state, { error }) => ({
    ...state,
    loading: false
  }))
);