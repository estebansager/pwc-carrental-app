
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { GetAvailableCarsActionGroup } from './state/car.actions';
import { availableCarsSelector } from './state/car.reducer';
import { Car } from './models/car.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  standalone: false
})
export class HomeComponent implements OnInit {

  availableCars$: Observable<Car[]>;

  constructor(private store: Store) { 
    this.availableCars$ = this.store.select(availableCarsSelector)
   }

  ngOnInit(): void {

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