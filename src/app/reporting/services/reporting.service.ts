import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "../../core/services/config.service";
import { MostRentedCar } from "../models/most-rented-car.model";

@Injectable({ providedIn: 'root' })
export class ReportingService {
    
    constructor(private http: HttpClient, private configService: ConfigService ) { }

    getMostRentedCar(from: string, to: string) {
        let params = new HttpParams();
        params = params.set("startDate", from);
        params = params.set("endDate", to);
        
        return this.http.get<MostRentedCar>(`${ this.configService.mostRentedCar()}`, {params: params});
    }

}