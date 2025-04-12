import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarSearchFormComponent } from "./car-search-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home.component";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CarEffects } from "./state/car.effects";
import { carReducer, carReducerKey, CarState } from "./state/car.reducer";
import { CarResultsListComponent } from "./car-search-results.component";

const routes: Routes = [
    { path: '', component: HomeComponent },
  ];

  
@NgModule({
    declarations: [HomeComponent, CarSearchFormComponent, CarResultsListComponent],
    imports: [
        CommonModule, 
        ReactiveFormsModule, 
        RouterModule.forChild(routes),
        EffectsModule.forFeature([CarEffects]),
        StoreModule.forFeature(carReducerKey, carReducer)
    ],
  })
  export class HomeModule {}


