import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ScheduledService } from './models/service.model';
import { scheduledServicesSelector, servicesLoadingSelector } from './state/services.reducer';
import { ServicesActionGroup } from './state/services.actions';

@Component({
  templateUrl: './services.component.html',
  standalone: false
})
export class ScheduledServiceDashboardComponent implements OnInit {
  
  services$: Observable<ScheduledService[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    
    this.services$ = this.store.select(scheduledServicesSelector);
    this.loading$ = this.store.select(servicesLoadingSelector);

    this.store.dispatch(ServicesActionGroup.getScheduledServices());
  }
}