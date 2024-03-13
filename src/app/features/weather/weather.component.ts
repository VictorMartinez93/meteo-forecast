import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutService } from '../../shared/services/layout.service';
import { ForecastService } from '../../shared/services/forecast.service';
import { Subscription, finalize } from 'rxjs';
import { ForecastParams } from '../../shared/interfaces/forecast/forecast-params';
import { EForecastParams } from '../../shared/enums/e-forecast-params.enum';
import { ForecastRow } from '../../shared/interfaces/forecast/forecast-row';
import { Column } from '../../shared/interfaces/base/column';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  public forecastData!: ForecastRow[];
  public isLoading!: boolean;
  public columns: Column[] = [
    { label: 'Time', name: 'time' },
    { label: 'Temperature 2m', name: 'temperature' },
    { label: 'Wind Speed 10m', name: 'windSpeed' }
  ];

  private subscriptions$: Subscription = new Subscription();

  constructor(
    private readonly layoutService: LayoutService,
    private readonly forecastService: ForecastService
  ) {
    layoutService.breadcrumb.set([{ label: 'Weather', routerLink: '/weather' }]);
  }

  ngOnInit() {
    this.getForecast();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  public sort(column: Column): void {
    this.columns = this.columns.map((c: Column) => {
      if (c.name !== column.name) {
        c.asc = undefined;
      }
      return c;
    });
    if (column.asc === undefined) {
      column.asc = true;
    } else if (column.asc) {
      column.asc = false;
    } else {
      column.asc = true;
    }
    this.forecastData = this.forecastService.sort(this.forecastData, column, column.asc);
  }

  private getForecast(): void {
    this.isLoading = true;
    const forecastParams: ForecastParams = {
      forecast_days: 1,
      hourly: [EForecastParams.TEMPERATURE_2M, EForecastParams.WIND_SPEED_10M],
      latitude: [52],
      longitude: [13]
    };
    this.subscriptions$.add(
      this.forecastService.get(forecastParams)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe((response: ForecastRow[]) => {
          this.forecastData = response;
        })
    );
  }

}
