import { Component, EventEmitter, Output, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


// Custom Validator for Start Date (should be present or future)
export function startDateValidator(control: AbstractControl): ValidationErrors | null {
  const startDate = new Date(control.value +  'T00:00:00');
  const currentDate = new Date(new Date().toDateString());
  if (startDate < currentDate) {
    return { startDateInvalid: true };
  }
  return null;
}

// Custom Validator for End Date (should be after the start date)
export function endDateValidator(control: AbstractControl): ValidationErrors | null {
  const startDate = new Date(control.parent?.get('startDate')?.value  + 'T00:00:00');
  const endDate = new Date(control.value +  'T00:00:00');
  if (endDate < startDate) {
    return { endDateInvalid: true };
  }
  return null;
}



@Component({
  selector: 'car-search-form',
  templateUrl: './car-search-form.component.html',
  standalone: false
})
export class CarSearchFormComponent {

  @Output() search = new EventEmitter<{
    startDate: string;
    endDate: string;
    type?: string;
    model?: string;
  }>();

  @Input() carTypes$: Observable<string[]>;
  @Input() carModels$: Observable<string[]>;
  
  
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      startDate: ['', [Validators.required, startDateValidator]],
      endDate: ['', [Validators.required, endDateValidator]],
      type: [''],
      model: ['']
    });
  }

  submit() {
    if (this.form.valid) {
      this.search.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

    // Getter for easy access to form controls
    get startDate() {
      return this.form.get('startDate');
    }
  
    get endDate() {
      return this.form.get('endDate');
    }


}