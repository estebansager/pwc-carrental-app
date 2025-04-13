import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Rental } from './models/rental.model';
import { filter, Observable } from 'rxjs';
import { CarModelsActionGroup, CarTypesActionGroup } from '../shared/cars/state/cars.actions';
import { carModelsSelector, carTypesSelector } from '../shared/cars/state/cars.reducer';
import { ClearErrorAndConfirmation, GetRentalActionGroup, ModifyRentalActionGroup, RentalActionGroup } from './state/rental.actions';
import { RentalIn } from './models/rental-in.model';
import { rentalApiErrorSelector, rentalConfirmationSelector, selectedRentalSelector } from './state/rental.reducer';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

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
  rentalToUpdate$: Observable<Rental>;

  rentalIdToUpdate: string;
  editMode: boolean;

  constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute, private datePipe: DatePipe) {
    
    this.carTypes$ = this.store.select(carTypesSelector);
    this.carModels$ = this.store.select(carModelsSelector);
    this.apiError$ = this.store.select(rentalApiErrorSelector);
    this.rentalConfirmation$ = this.store.select(rentalConfirmationSelector);
    this.rentalToUpdate$ = this.store.select(selectedRentalSelector);

    this.form = this.fb.group({
      customerIdNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
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
      this.store.dispatch(ClearErrorAndConfirmation());

      this.route.queryParamMap.subscribe((params) => {
        const rentalId = params.get('rentalId');
        if (!!rentalId) {
          this.store.dispatch(GetRentalActionGroup.tryGetRental({rentalId}));
        } else {
          this.editMode = false;
          this.form.reset();
        }
        
      });

      this.rentalToUpdate$
          .pipe(filter(r => !!r))
          .subscribe(r => { 
            this.updateForm(r);
            this.rentalIdToUpdate = r.id
        });

  }

  updateForm(rental: Rental) {
      this.form.patchValue({
        customerIdNumber: rental.customerIdNumber,
        customerFullName: rental.customerFullName,
        customerAddress: rental.customerAddress,
        carType: rental.carType,
        carModel: rental.carModel,
        startDate: this.datePipe.transform(rental.startDate, 'yyyy-MM-dd'),
        endDate: this.datePipe.transform(rental.endDate, 'yyyy-MM-dd')
      });
      this.editMode = true;
  }


  submit() {
    if (this.form.valid) {
      switch(this.editMode) {
        case true: {
          this.store.dispatch(ModifyRentalActionGroup.tryModifyRental({
            modifyRentalIn: {
              rentalId: this.rentalIdToUpdate,
              carModel: this.carModel.value,
              carType: this.carType.value,
              endDate: this.endDate.value,
              startDate: this.startDate.value
            }
          }));
          break; 
        }
      
        case false: {
          const rental: RentalIn = this.form.value;
          this.store.dispatch(RentalActionGroup.tryRentCar({ data: rental }));
        }
      }
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