import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Car } from '../models/car.model';
import { Observable } from 'rxjs';
import { ConfigService } from '../../core/services/config.service';

@Injectable({ providedIn: 'root' })
export class CarService {

  constructor(private http: HttpClient, private configService: ConfigService ) { }

  getAvailableCars(criteria: {
    startDate: string;
    endDate: string;
    type?: string;
    model?: string;
  }): Observable<Car[]> {

    let params = new HttpParams();
    params = params.set("startDate", criteria.startDate);
    params = params.set("endDate", criteria.endDate);
    
    if(!!criteria.model)
        params = params.set("model", criteria.model)

    if(!!criteria.type)
        params = params.set("type", criteria.type)

    
    return this.http.get<Car[]>(`${ this.configService.rentalsAvailability()}`, {
        params: params
    });

  }
}