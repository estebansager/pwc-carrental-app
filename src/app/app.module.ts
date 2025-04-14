import { inject, NgModule, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app.routing.module';
import { provideHttpClient } from '@angular/common/http';
import { ConfigService } from './core/services/config.service';
import { ErrorModule } from './shared/errors/error.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ErrorModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
  ],
  providers: [
    provideHttpClient(), 
    provideAppInitializer(() => { return (inject(ConfigService) as ConfigService).loadConfig()})
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }


export function loadConfig(configService: ConfigService) {
    return () => configService.loadConfig();
}