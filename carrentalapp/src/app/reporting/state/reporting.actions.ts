import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MostRentedCar } from '../models/most-rented-car.model';

export const MostRentedCarsActionGroup = createActionGroup({
    source: 'Most Rented Cars',
    events: {
      'Get Most Rented Cars': props<{from: string, to: string}>(),
      'Most Rented Cars Success': props<{car: MostRentedCar}>(),
      'Most Rented Cars Failure': props<{ error: string }>(),
    }
  });
  
