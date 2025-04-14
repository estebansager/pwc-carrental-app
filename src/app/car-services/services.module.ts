
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ServicesEffects } from './state/services.effects';
import { servicesReducer, servicesReducerKey } from './state/services.reducer';
import { ScheduledServiceDashboardComponent } from './services.component';

const routes: Routes = [
  { path: '', component: ScheduledServiceDashboardComponent },
];

@NgModule({
    declarations: [ScheduledServiceDashboardComponent],
    imports: [
        CommonModule, 
        ReactiveFormsModule, 
        RouterModule.forChild(routes),
        EffectsModule.forFeature([ServicesEffects]),
        StoreModule.forFeature(servicesReducerKey, servicesReducer)
    ],
})
export class ServicesModule {}
