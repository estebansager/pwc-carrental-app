import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { ClearErrorAndConfirmation, GetRentalActionGroup, ModifyRentalActionGroup, RentalActionGroup, RentalListActionGroup } from './rental.actions';
import { Rental } from '../models/rental.model';

export interface RentalState {
  apiError: string;
  loading: boolean;
  rentalConfirmation: Rental;
  selectedRental: Rental;
}


export const initialState: RentalState = {
  loading: false,
  apiError: '',
  rentalConfirmation: null,
  selectedRental: null
};

export const rentalReducerKey = 'rental';
export const rentalFeatureSelector = createFeatureSelector<RentalState>(rentalReducerKey);
export const rentalApiErrorSelector = createSelector(rentalFeatureSelector, (state) => state.apiError);
export const rentalConfirmationSelector = createSelector(rentalFeatureSelector, (state) => state.rentalConfirmation);
export const selectedRentalSelector = createSelector(rentalFeatureSelector, (state) => state.selectedRental);
export const rentalLoadingSelector = createSelector(rentalFeatureSelector, (state) => state.loading);


export const rentalReducer = createReducer(
  initialState,

  on(RentalActionGroup.tryRentCar, (state) => ({
    ...state,
    loading: true,
    apiError: null,
    rentalConfirmation: null,
    selectedRental: null
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
  })),

  on(ModifyRentalActionGroup.tryModifyRental, (state) => ({
    ...state,
    apiError: '',
    loading: true
  })),

  on(ModifyRentalActionGroup.modifyRentalSuccess, (state, {rental}) => ({
    ...state,
    apiError: '',
    loading: false,
    rentalConfirmation: rental
  })),

  on(ModifyRentalActionGroup.modifyRentalFailure, (state, { error }) => ({
    ...state,
    apiError: error,
    loading: false,
    rentalConfirmation: null
  })),

  on(GetRentalActionGroup.tryGetRental, (state) => ({
    ...state,
    selectedRental: null,
    loading: true
  })),

  on(GetRentalActionGroup.getRentalSuccess, (state, {rental}) => ({
    ...state,
    selectedRental: rental,
    loading: false
  })),
  
  on(GetRentalActionGroup.getRentalFailure, (state, {error}) => ({
    ...state,
    selectedRental: null,
    loading: false,
    apiError: error
  })),

  on(ClearErrorAndConfirmation, (state) => ({...state, apiError: null, rentalConfirmation: null}))

);