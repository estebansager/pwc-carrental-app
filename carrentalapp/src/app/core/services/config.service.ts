import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class ConfigService {
    private config: any;
  
    constructor(private http: HttpClient) {}
  
    async loadConfig(): Promise<void> {
      this.config = await firstValueFrom(this.http.get('/assets/config.json'));
    }
  
    rentalsAvailability(): string {
      return this.config?.api?.rentals?.availability || '';
    }
  
    carTypes(): string {
      return this.config?.api?.cars?.types || '';
    }
  
  
    carModels(): string {
      return this.config?.api?.cars?.models || '';
    }
  
  }