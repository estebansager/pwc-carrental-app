import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Rental } from './models/rental.model';
import { Observable } from 'rxjs';
import { CarModelsActionGroup, CarTypesActionGroup } from '../shared/cars/state/cars.actions';
import { carModelsSelector, carTypesSelector } from '../shared/cars/state/cars.reducer';

@Component({
  selector: 'rental-registration',
  templateUrl: './rental-registration.component.html',
  styleUrls: [],
  standalone: false
})
export class RentalRegistrationComponent implements OnInit{

  form: FormGroup;

  carTypes$: Observable<string[]>;
  carModels$: Observable<string[]>;
  
  constructor(private fb: FormBuilder, private store: Store) {
    
    this.carTypes$ = this.store.select(carTypesSelector);
    this.carModels$ = this.store.select(carModelsSelector);

    this.form = this.fb.group({
      personalIdNum: ['', [Validators.required]],
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
      const rental: Rental = this.form.value;
      //this.store.dispatch(CreateRentalAction({ rental }));
    } else {
      this.form.markAllAsTouched(); 
    }
  }

  get personalIdNum() { return this.form.get('personalIdNum'); }
  get customerFullName() { return this.form.get('customerFullName'); }
  get customerAddress() { return this.form.get('customerAddress'); }
  get carType() { return this.form.get('carType'); }
  get carModel() { return this.form.get('carModel'); }
  get startDate() { return this.form.get('startDate'); }
  get endDate() { return this.form.get('endDate'); }
}