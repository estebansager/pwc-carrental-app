import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car } from './models/car.model';
import { CarResults } from './models/car-results.model';

@Component({
  selector: 'car-search-results',
  templateUrl: './car-search-results.component.html',
  styleUrls: [],
  standalone: false
})
export class CarResultsListComponent implements OnInit {

  @Input()availableCars$: Observable<CarResults[]>; 


  constructor() {
    
  }

  ngOnInit(): void {

  }
}