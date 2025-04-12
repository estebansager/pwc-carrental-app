import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car } from './models/car.model';

@Component({
  selector: 'car-search-results',
  templateUrl: './car-search-results.component.html',
  styleUrls: [],
  standalone: false
})
export class CarResultsListComponent implements OnInit {

  @Input()availableCars$: Observable<Car[]>; 


  constructor(private store: Store) {
    
  }

  ngOnInit(): void {

  }
}