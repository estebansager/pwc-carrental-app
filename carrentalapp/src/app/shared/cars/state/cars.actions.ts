import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const CarTypesActionGroup = createActionGroup({
    source: 'CarTypes',
    events: {
      'Get Car Types': emptyProps(),
      'Get Car Types Success': props<{types: string[]}>(),
      'Get Car Types Failure': props<{ error: unknown }>(),
    }
  });
  
  export const CarModelsActionGroup = createActionGroup({
    source: 'CarModels',
    events: {
      'Get Car Models': emptyProps(),
      'Get Car Models Success': props<{models: string[]}>(),
      'Get Car Models Failure': props<{ error: unknown }>(),
    }
  });
  
