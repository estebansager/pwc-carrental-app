
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RentalRegistrationComponent } from './rental-registration.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CarModule } from '../shared/cars/car.module';
import { rentalReducer, rentalReducerKey } from './state/rental.reducer';
import { RentalEffects } from './state/rental.effects';
import { rentalListReducer, rentalListReducerKey } from './state/rental-list.reducer';
import { RentalListComponent } from './rentals-list.component';
import { ErrorComponent } from "../shared/errors/error.component";
import { ErrorModule } from '../shared/errors/error.module';

const routes: Routes = [
  { path: '', component: RentalRegistrationComponent },
  { path: 'list', component: RentalListComponent },
  { path: '**', component: RentalRegistrationComponent }
];

@NgModule({
    declarations: [RentalRegistrationComponent, RentalListComponent],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes, ),
      EffectsModule.forFeature([RentalEffects]),
      StoreModule.forFeature(rentalReducerKey, rentalReducer),
      StoreModule.forFeature(rentalListReducerKey, rentalListReducer),
      CarModule,
      ErrorModule
    ],
    providers: [DatePipe]
})
export class RentalsModule {}
