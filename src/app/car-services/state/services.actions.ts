import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ScheduledService } from '../models/service.model';

export const ServicesActionGroup = createActionGroup({
    source: 'Services',
    events: {
      'Get Scheduled Services': emptyProps(),
      'Scheduled Services Success': props<{services: ScheduledService[]}>(),
      'Scheduled Services Failure': props<{ error: string }>(),
    }
  });
  
