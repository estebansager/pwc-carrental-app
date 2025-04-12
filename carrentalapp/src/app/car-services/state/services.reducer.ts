import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { ScheduledService } from '../models/service.model';
import { ServicesActionGroup } from './services.actions';

export interface ServicesState {
  apiError: string;
  loading: boolean;
  scheduledServices: ScheduledService[];
}


export const initialState: ServicesState = {
  loading: false,
  apiError: '',
  scheduledServices: []
};

export const servicesReducerKey = 'services';
export const servicesFeatureSelector = createFeatureSelector<ServicesState>(servicesReducerKey);
export const servicesApiErrorSelector = createSelector(servicesFeatureSelector, (state) => state.apiError);
export const scheduledServicesSelector = createSelector(servicesFeatureSelector, (state) => state.scheduledServices);
export const servicesLoadingSelector = createSelector(servicesFeatureSelector, (state) => state.loading);



export const servicesReducer = createReducer(
  initialState,

  on(ServicesActionGroup.getScheduledServices, (state) => ({
    ...state,
    loading: true,
    apiError: null,
    scheduledServices: []
  })),

  on(ServicesActionGroup.scheduledServicesSuccess, (state, { services }) => ({
        ...state, 
        loading: false, 
        apiError: null, 
        scheduledServices: services
  })),

  on(ServicesActionGroup.scheduledServicesFailure, (state, { error }) => ({
    ...state,
    apiError: error,
    loading: false,
    scheduledServices: []
  }))
);