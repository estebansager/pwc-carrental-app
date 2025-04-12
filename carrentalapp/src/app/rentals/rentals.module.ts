
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RentalRegistrationComponent } from './rental-registration.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CarModule } from '../shared/cars/car.module';
import { rentalReducer, rentalReducerKey } from './state/rental.reducer';
import { RentalEffects } from './state/rental.effects';

const routes: Routes = [
  { path: '', component: RentalRegistrationComponent },
];

@NgModule({
    declarations: [RentalRegistrationComponent],
    imports: [
        CommonModule, 
        ReactiveFormsModule, 
        RouterModule.forChild(routes),
        EffectsModule.forFeature([RentalEffects]),
        StoreModule.forFeature(rentalReducerKey, rentalReducer),
        CarModule
    ],
})
export class RentalsModule {}
