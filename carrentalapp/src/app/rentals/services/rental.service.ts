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

    getRentals() {
        return this.http.get<Rental[]>(`${ this.configService.rentals()}`);
    }

    getRental(id: string) {
        return this.http.get<Rental>(`${ this.configService.rentals()}/${id}`);
    }

    cancelRental(rentalId: string) {
        return this.http.delete(`${ this.configService.rentals()}/${rentalId}`);
    }

    modifyRental(rentalId: string, carType: string, carModel: string, startDate: string, endDate: string ) {
        return this.http.put<Rental>(`${ this.configService.rentals()}/${rentalId}`, {
            "carModel": carModel,
            "carType": carType,
            "startDate": startDate,
            "endDate": endDate
        });
    }


}