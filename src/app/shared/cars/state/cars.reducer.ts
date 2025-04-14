import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { CarModelsActionGroup, CarTypesActionGroup } from './cars.actions';

export interface CarState{
  types: string[];
  models: string[];
}

export const initialState: CarState = {
  types: [],
  models: []
};


export const carReducerKey = 'cars';
export const carFeatureSelector = createFeatureSelector<CarState>(carReducerKey);
export const carTypesSelector = createSelector(carFeatureSelector, (state: CarState) => state.types);
export const carModelsSelector = createSelector(carFeatureSelector, (state: CarState) => state.models);



export const carReducer = createReducer(
  initialState,
  on(CarTypesActionGroup.getCarTypesSuccess, (state, {types}) => ({
    ...state,
    types:types
  })),
  on(CarModelsActionGroup.getCarModelsSuccess, (state, {models}) => ({
    ...state,
    models: models
  }))
);