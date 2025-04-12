import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../core/services/config.service';
import { CarResults } from '../../../home/models/car-results.model';

@Injectable({ providedIn: 'root' })
export class CarService {

  constructor(private http: HttpClient, private configService: ConfigService ) { }

  getAvailableCars(criteria: {
    startDate: string;
    endDate: string;
    type?: string;
    model?: string;
  }): Observable<CarResults[]> {

    let params = new HttpParams();
    params = params.set("startDate", criteria.startDate);
    params = params.set("endDate", criteria.endDate);
    
    if(!!criteria.model)
        params = params.set("model", criteria.model)

    if(!!criteria.type)
        params = params.set("type", criteria.type)

    
    return this.http.get<CarResults[]>(`${ this.configService.rentalsAvailability()}`, {
        params: params
    });

  }


  getCarTypes() {
    return this.http.get<string[]>(`${ this.configService.carTypes()}`);
  }

  getCarModels() {
    return this.http.get<string[]>(`${ this.configService.carModels()}`);
  }
}