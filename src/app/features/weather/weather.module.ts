import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { WeatherRoutingModule } from './weather-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    WeatherRoutingModule,
    SharedModule
  ],
  declarations: [WeatherComponent]
})
export class WeatherModule { }
