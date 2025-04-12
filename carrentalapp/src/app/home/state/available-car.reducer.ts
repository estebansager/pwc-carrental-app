import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { CarResults } from '../models/car-results.model';
import { GetAvailableCarsActionGroup } from './available-car.actions';

export interface AvailableCarsState {
  cars: CarResults[];
  loading: boolean;
}


export const initialState: AvailableCarsState = {
  cars: [],
  loading: false
};

export const availableCarReducerKey = 'availableCars';
export const carFeatureSelector = createFeatureSelector<AvailableCarsState>(availableCarReducerKey);
export const availableCarsSelector = createSelector(carFeatureSelector, (state: AvailableCarsState) => state.cars);
export const carsLoadingSelector = createSelector(carFeatureSelector, (state: AvailableCarsState) => state.loading);

export const availableCarReducer = createReducer(
  initialState,

  on(GetAvailableCarsActionGroup.getAvailableCars, (state) => ({
    ...state,
    loading: true
  })),

  on(GetAvailableCarsActionGroup.getAvailableCarsSuccess, (state, { cars }) => {
    return {...state, cars: cars, loading: false};
  }),

  on(GetAvailableCarsActionGroup.getAvailableCarsFailure, (state, { error }) => ({
    ...state,
    loading: false
  }))
);