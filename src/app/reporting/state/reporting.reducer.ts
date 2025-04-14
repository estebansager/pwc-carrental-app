import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { MostRentedCar } from '../models/most-rented-car.model';
import { MostRentedCarsActionGroup } from './reporting.actions';

export interface ReportingState {
  apiError: string;
  loading: boolean;
  mostRentedCar: MostRentedCar;
}


export const initialState: ReportingState = {
  loading: false,
  apiError: '',
  mostRentedCar: null
};

export const reportingReducerKey = 'reporting';
export const reportingFeatureSelector = createFeatureSelector<ReportingState>(reportingReducerKey);
export const mostRentedCarApiErrorSelector = createSelector(reportingFeatureSelector, (state) => state.apiError);
export const mostRentedCarSelector = createSelector(reportingFeatureSelector, (state) => state.mostRentedCar);
export const mostRentedCarLoadingSelector = createSelector(reportingFeatureSelector, (state) => state.loading);



export const reportingReducer = createReducer(
  initialState,

  on(MostRentedCarsActionGroup.getMostRentedCars, (state) => ({
    ...state,
    loading: true,
    apiError: null,
    scheduledServices: []
  })),

  on(MostRentedCarsActionGroup.mostRentedCarsSuccess, (state, { car }) => ({
        ...state, 
        loading: false, 
        apiError: null, 
        mostRentedCar: car
  })),

  on(MostRentedCarsActionGroup.mostRentedCarsFailure, (state, { error }) => ({
    ...state,
    apiError: error,
    loading: false,
    mostRentedCar: null
  }))
);