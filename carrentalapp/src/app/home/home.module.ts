import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarSearchFormComponent } from "./car-search-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home.component";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AvailableCarEffects } from "./state/available-car.effects";
import { availableCarReducer, availableCarReducerKey, AvailableCarsState } from "./state/available-car.reducer";
import { CarResultsListComponent } from "./car-search-results.component";
import { CarModule } from "../shared/cars/car.module";

const routes: Routes = [
    { path: '', component: HomeComponent },
  ];

  
@NgModule({
    declarations: [HomeComponent, CarSearchFormComponent, CarResultsListComponent],
    imports: [
        CommonModule, 
        ReactiveFormsModule, 
        RouterModule.forChild(routes),
        EffectsModule.forFeature([AvailableCarEffects]),
        StoreModule.forFeature(availableCarReducerKey, availableCarReducer),
        CarModule
    ],
  })
  export class HomeModule {}


