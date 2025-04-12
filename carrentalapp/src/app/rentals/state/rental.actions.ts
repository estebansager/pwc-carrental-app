import { createActionGroup, props } from '@ngrx/store';
import { Rental } from '../models/rental.model';
import { RentalIn } from '../models/rental-in.model';

export const RentalActionGroup = createActionGroup({
    source: 'Rentals',
    events: {
      'Try Rent Car': props<{data: RentalIn}>(),
      'Rent Car Success': props<{rental: Rental}>(),
      'Rent Car Failure': props<{ error: string }>(),
    }
  });
  
