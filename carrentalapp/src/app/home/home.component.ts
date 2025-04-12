
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { GetAvailableCarsActionGroup } from './state/available-car.actions';
import { availableCarsSelector } from './state/available-car.reducer';
import { Car } from './models/car.model';
import { CarResults } from './models/car-results.model';
import { carModelsSelector, carTypesSelector } from '../shared/cars/state/cars.reducer';
import { CarModelsActionGroup, CarTypesActionGroup } from '../shared/cars/state/cars.actions';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  standalone: false
})
export class HomeComponent implements OnInit {

  availableCars$: Observable<CarResults[]>;
  carTypes$: Observable<string[]>;
  carModels$: Observable<string[]>;
  

  constructor(private store: Store) { 
    this.availableCars$ = this.store.select(availableCarsSelector)
    this.carTypes$ = this.store.select(carTypesSelector);
    this.carModels$ = this.store.select(carModelsSelector);
    
   }

  ngOnInit(): void {
    this.store.dispatch(CarTypesActionGroup.getCarTypes());
    this.store.dispatch(CarModelsActionGroup.getCarModels());
    
  }

  onSearch(criteria: {
    startDate: string;
    endDate: string;
    type?: string;
    model?: string;
  }) {
    this.store.dispatch(GetAvailableCarsActionGroup.getAvailableCars({ criteria }));
  }
}