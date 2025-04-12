import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "../../core/services/config.service";
import { ScheduledService } from "../models/service.model";

@Injectable({ providedIn: 'root' })
export class CarServicesService {
    
    constructor(private http: HttpClient, private configService: ConfigService ) { }

    getScheduledServices() {
        return this.http.get<ScheduledService[]>(`${ this.configService.scheduledServices()}`);
    }

}