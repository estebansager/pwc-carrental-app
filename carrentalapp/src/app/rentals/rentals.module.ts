/*
// rentals.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RentalFormComponent } from './components/rental-form.component';
import { RentalConfirmationComponent } from './components/rental-confirmation.component';
import { RentalsListComponent } from './components/rentals-list.component';

const routes: Routes = [
  { path: '', component: RentalsListComponent },
  { path: 'new', component: RentalFormComponent },
  { path: 'confirmation', component: RentalConfirmationComponent },
];

@NgModule({
  declarations: [RentalFormComponent, RentalConfirmationComponent, RentalsListComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class RentalsModule {}
*/