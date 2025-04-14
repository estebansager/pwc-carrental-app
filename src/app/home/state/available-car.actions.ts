import { createActionGroup, props } from '@ngrx/store';
import { CarResults } from '../models/car-results.model';

export const GetAvailableCarsActionGroup = createActionGroup({
    source: 'AvailableCars',
    events: {
      'Get Available Cars': props<{criteria: {
        startDate: string;
        endDate: string;
        type?: string;
        model?: string;
      };}>(),
      'Get Available Cars Success': props<{cars: CarResults[]}>(),
      'Get Available Cars Failure': props<{ error: unknown }>(),
    }
  });
  
