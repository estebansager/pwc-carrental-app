import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { CancelRentalActionGroup, RentalListActionGroup } from './rental.actions';
import { Rental } from '../models/rental.model';

export interface RentalListState extends EntityState<Rental> {
  loading: boolean;
  apiError: string;
}

export const rentalListAdapter: EntityAdapter<Rental> = createEntityAdapter<Rental>();


export const initialState: RentalListState = rentalListAdapter.getInitialState({
    loading: false,
    apiError: ''
  });

export const rentalListReducerKey = 'rentalList';
export const rentalFeature = createFeatureSelector<RentalListState>(rentalListReducerKey);
export const rentalListSelector = createSelector(rentalFeature, rentalListAdapter.getSelectors().selectAll);
export const rentalListApiError = createSelector(rentalFeature, (state) => state.apiError);


export const rentalListReducer = createReducer(
  initialState,

  on(RentalListActionGroup.tryGetRentals, (state) => ({
    ...state,
    loading: true,
  })),

  on(RentalListActionGroup.getRentalsSuccess, (state, { rentals }) => {
        return rentalListAdapter.setAll(rentals, { ...state, loading: false });
    }),

  on(RentalListActionGroup.getRentalsFailure, (state, { error }) => ({
    ...state,
    apiError: error,
    loading: false
  })),

   on(CancelRentalActionGroup.cancelRentalSuccess, (state, { rentalId }) => {
        return rentalListAdapter.removeOne(rentalId, {
            ...state, 
            loading: false, 
            apiError: null });
   }),

   on(CancelRentalActionGroup.cancelRentalFailure, (state, { error }) => {
    return {
        ...state, 
        loading: false, 
        apiError: error };
    })

);