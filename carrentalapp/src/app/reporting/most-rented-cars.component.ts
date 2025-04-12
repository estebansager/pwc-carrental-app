import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { MostRentedCar } from "./models/most-rented-car.model";
import { Store } from "@ngrx/store";
import { MostRentedCarsActionGroup } from "./state/reporting.actions";
import { mostRentedCarApiErrorSelector, mostRentedCarLoadingSelector, mostRentedCarSelector } from "./state/reporting.reducer";

@Component({
    templateUrl: './most-rented-cars.component.html',
    standalone: false
  })
export class MostRentedCarStatsComponent implements OnInit {
  form: FormGroup;
  mostRentedCar$: Observable<MostRentedCar>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.mostRentedCar$ = this.store.select(mostRentedCarSelector);
    this.loading$ = this.store.select(mostRentedCarLoadingSelector);
    this.error$ = this.store.select(mostRentedCarApiErrorSelector);
  }

  onSubmit(): void {
    const { startDate, endDate } = this.form.value;
    this.store.dispatch(MostRentedCarsActionGroup.getMostRentedCars({ from: startDate, to: endDate }));
  }
}