import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { carReducer, carReducerKey } from './state/cars.reducer';
import { CarEffects } from './state/cars.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(carReducerKey, carReducer),
    EffectsModule.forFeature([CarEffects])
  ],
  exports: [StoreModule, EffectsModule]
})
export class CarModule {}