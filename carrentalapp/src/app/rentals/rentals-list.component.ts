import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { Rental } from "./models/rental.model";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { CancelRentalActionGroup, RentalListActionGroup } from "./state/rental.actions";
import { rentalListApiError, rentalListSelector } from "./state/rental-list.reducer";

@Component({
    selector: 'rentals-list',
    templateUrl: './rentals-list.component.html',
    standalone: false
  })
  export class RentalListComponent implements OnInit {
    
    rentals$: Observable<Rental[]>;
    apiError$: Observable<string>;

    constructor(private router: Router, private store: Store<any>) {}
    
    ngOnInit(): void {
        this.rentals$ = this.store.select(rentalListSelector);
        this.apiError$ = this.store.select(rentalListApiError);

        this.store.dispatch(RentalListActionGroup.tryGetRentals());
    }

    edit(rentalId: string) {
      this.router.navigate(['rentals'], { queryParams: { rentalId } });
    }
  
    cancel(rentalId: string) {
      if (confirm('Are you sure you want to cancel this rental?')) {
        this.store.dispatch(CancelRentalActionGroup.tryCancelRental({rentalId}));
      }
    }
  }