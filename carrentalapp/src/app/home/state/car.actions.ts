import { createActionGroup, props } from '@ngrx/store';
import { Car } from '../models/car.model';

export const GetAvailableCarsActionGroup = createActionGroup({
    source: 'Cars',
    events: {
      'Get Available Cars': props<{criteria: {
        startDate: string;
        endDate: string;
        type?: string;
        model?: string;
      };}>(),
      'Get Available Cars Success': props<{cars: Car[]}>(),
      'Get Available Cars Failure': props<{ error: unknown }>(),
    }
  });
  
