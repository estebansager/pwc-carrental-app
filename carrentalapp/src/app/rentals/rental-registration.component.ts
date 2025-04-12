import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Rental } from './models/rental.model';
import { Observable } from 'rxjs';
import { CarModelsActionGroup, CarTypesActionGroup } from '../shared/cars/state/cars.actions';
import { carModelsSelector, carTypesSelector } from '../shared/cars/state/cars.reducer';
import { RentalActionGroup } from './state/rental.actions';
import { RentalIn } from './models/rental-in.model';
import { rentalApiErrorSelector, rentalConfirmationSelector } from './state/rental.reducer';

@Component({
  selector: 'rental-registration',
  templateUrl: './rental-registration.component.html',
  styleUrls: [],
  standalone: false
})
export class RentalRegistrationComponent implements OnInit{
  
  apiError$: Observable<string>;
  form: FormGroup;

  carTypes$: Observable<string[]>;
  carModels$: Observable<string[]>;
  rentalConfirmation$: Observable<Rental>;
  
  constructor(private fb: FormBuilder, private store: Store) {
    
    this.carTypes$ = this.store.select(carTypesSelector);
    this.carModels$ = this.store.select(carModelsSelector);
    this.apiError$ = this.store.select(rentalApiErrorSelector);
    this.rentalConfirmation$ = this.store.select(rentalConfirmationSelector);

    this.form = this.fb.group({
      customerIdNumber: ['', [Validators.required]],
      customerFullName: ['', [Validators.required, Validators.minLength(3)]],
      customerAddress: ['', Validators.required],
      carType: ['', Validators.required],
      carModel: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

  }

  ngOnInit(): void {
      this.store.dispatch(CarTypesActionGroup.getCarTypes());
      this.store.dispatch(CarModelsActionGroup.getCarModels());
  }

  submit() {
    if (this.form.valid) {
      const rental: RentalIn = this.form.value;
      this.store.dispatch(RentalActionGroup.tryRentCar({ data: rental }));
    } else {
      this.form.markAllAsTouched(); 
    }
  }

  get customerIdNumber() { return this.form.get('customerIdNumber'); }
  get customerFullName() { return this.form.get('customerFullName'); }
  get customerAddress() { return this.form.get('customerAddress'); }
  get carType() { return this.form.get('carType'); }
  get carModel() { return this.form.get('carModel'); }
  get startDate() { return this.form.get('startDate'); }
  get endDate() { return this.form.get('endDate'); }
}