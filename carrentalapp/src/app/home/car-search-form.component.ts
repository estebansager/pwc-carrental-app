import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  form: FormGroup;
  carTypes = ['Sedan', 'SUV', 'Hatchback', 'Pickup'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
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
}