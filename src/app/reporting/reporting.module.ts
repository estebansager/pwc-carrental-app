import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MostRentedCarStatsComponent } from './most-rented-cars.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { ReportingEffects } from './state/reporting.effects';
import { StoreModule } from '@ngrx/store';
import { reportingReducer, reportingReducerKey } from './state/reporting.reducer';

const routes: Routes = [
  { path: '', component: MostRentedCarStatsComponent },
];

@NgModule({
  declarations: [MostRentedCarStatsComponent],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule.forChild(routes),
    EffectsModule.forFeature([ReportingEffects]),
    StoreModule.forFeature(reportingReducerKey, reportingReducer)
  ]
})
export class ReportingModule {}