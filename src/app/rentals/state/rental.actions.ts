import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Rental } from '../models/rental.model';
import { RentalIn } from '../models/rental-in.model';
import { ModifyRentalIn } from '../models/modify-rental-in.model';

export const RentalActionGroup = createActionGroup({
    source: 'New Rental',
    events: {
      'Try Rent Car': props<{data: RentalIn}>(),
      'Rent Car Success': props<{rental: Rental}>(),
      'Rent Car Failure': props<{ error: string }>(),
    }
  });


export const RentalListActionGroup = createActionGroup({
  source: 'List Rentals',
  events: {
    'Try Get Rentals': emptyProps(),
    'Get Rentals Success': props<{rentals: Rental[]}>(),
    'Get Rentals Failure': props<{ error: string }>(),
  }
});

export const CancelRentalActionGroup = createActionGroup({
  source: 'Cancel Rental',
  events: {
    'Try Cancel Rental': props<{rentalId: string}>(),
    'Cancel Rental Success': props<{rentalId: string}>(),
    'Cancel Rental Failure': props<{ error: string }>(),
  }
});


export const ModifyRentalActionGroup = createActionGroup({
  source: 'Modify Rental',
  events: {
    'Try Modify Rental': props<{modifyRentalIn: ModifyRentalIn}>(),
    'Modify Rental Success': props<{rental: Rental}>(),
    'Modify Rental Failure': props<{ error: string }>(),
  }
});

export const GetRentalActionGroup = createActionGroup({
  source: 'Get Rental',
  events: {
    'Try Get Rental': props<{rentalId: string}>(),
    'Get Rental Success': props<{rental: Rental}>(),
    'Get Rental Failure': props<{ error: string }>(),
  }
});

export const ClearErrorAndConfirmation = createAction("Clear Error and Confirmation");
