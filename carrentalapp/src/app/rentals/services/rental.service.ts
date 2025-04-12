import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "../../core/services/config.service";
import { RentalIn } from "../models/rental-in.model";
import { Rental } from "../models/rental.model";

@Injectable({ providedIn: 'root' })
export class RentalService {
    
    constructor(private http: HttpClient, private configService: ConfigService ) { }

    rentCar(rental: RentalIn) {
        return this.http.post<Rental>(`${ this.configService.rentals()}`, rental);
    }

}