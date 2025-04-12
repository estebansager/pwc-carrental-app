import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { RentalActionGroup } from './rental.actions';
import { Rental } from '../models/rental.model';

export interface RentalState {
  apiError: string;
  loading: boolean;
  rentalConfirmation: Rental;
}


export const initialState: RentalState = {
  loading: false,
  apiError: '',
  rentalConfirmation: null
};

export const rentalReducerKey = 'rental';
export const rentalFeatureSelector = createFeatureSelector<RentalState>(rentalReducerKey);
export const rentalApiErrorSelector = createSelector(rentalFeatureSelector, (state) => state.apiError);
export const rentalConfirmationSelector = createSelector(rentalFeatureSelector, (state) => state.rentalConfirmation);


export const rentalReducer = createReducer(
  initialState,

  on(RentalActionGroup.tryRentCar, (state) => ({
    ...state,
    loading: true,
    apiError: null,
    rentalConfirmation: null
  })),

  on(RentalActionGroup.rentCarSuccess, (state, { rental }) => ({
        ...state, 
        loading: false, 
        apiError: null, 
        rentalConfirmation: rental
  })),

  on(RentalActionGroup.rentCarFailure, (state, { error }) => ({
    ...state,
    apiError: error,
    loading: false,
    rentalConfirmation: null
  }))
);