
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RentalRegistrationComponent } from './rental-registration.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CarModule } from '../shared/cars/car.module';

const routes: Routes = [
  { path: '', component: RentalRegistrationComponent },
];

@NgModule({
    declarations: [RentalRegistrationComponent],
    imports: [
        CommonModule, 
        ReactiveFormsModule, 
        RouterModule.forChild(routes),
        EffectsModule.forFeature([]),
        //StoreModule.forFeature()
        CarModule
    ],
})
export class RentalsModule {}
