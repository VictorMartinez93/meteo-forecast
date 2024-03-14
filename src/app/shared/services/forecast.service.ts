import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { ForecastParams } from '../interfaces/forecast/forecast-params';
import { Filter } from '../interfaces/filters/filter';
import { Forecast } from '../interfaces/forecast/forecast';
import { ForecastRow } from '../interfaces/forecast/forecast-row';
import { environment } from '../../../environments/environment';
import { Column } from '../interfaces/base/column';
import { SessionStorageService } from './session-storage.service';
import { CONSTANTS } from '../../core/constants';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(
    private readonly http: HttpClient,
    private readonly sessionStorageService: SessionStorageService
  ) { }

  get(forecast: ForecastParams): Observable<ForecastRow[]> {
    const sessionStorage: ForecastRow[] = this.sessionStorageService.get(CONSTANTS.FORECAST_KEY) as ForecastRow[];

    if (sessionStorage?.length) {
      return of(sessionStorage);
    }

    const filters: Filter[] = this.buildFilters(forecast);
    const queryParams: string = this.buildQueryParams(filters);

    return this.http.get<Forecast>(`${environment.api.root}/${environment.api.forecast}${queryParams}`)
      .pipe(
        map((response: Forecast) => this.mapForecastToRows(response)),
        tap((response: ForecastRow[]) => this.sessionStorageService.set(CONSTANTS.FORECAST_KEY, response))
      );
  }

  // #region Sorting

  public sort(forecastRow: ForecastRow[], column: Column, asc: boolean): ForecastRow[] {
    if (column.name === 'time') {
      return forecastRow.sort((a: ForecastRow, b: ForecastRow) => this.sortByTime(a, b, asc));
    }
    if (column.name === 'temperature') {
      return forecastRow.sort((a: ForecastRow, b: ForecastRow) => this.sortByTemperature(a, b, asc));
    }

    return forecastRow.sort((a: ForecastRow, b: ForecastRow) => this.sortByWindSpeed(a, b, asc));
  }

  private sortByTime(forecastRowA: ForecastRow, forecastRowB: ForecastRow, asc: boolean): number {
    const dateA: Date = new Date(forecastRowA.time);
    const dateB: Date = new Date(forecastRowB.time);
    let result = 0;

    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return 0;
    }

    if (asc) {
      result = dateA.getTime() - dateB.getTime();
    } else {
      result = dateB.getTime() - dateA.getTime();
    }

    return result;
  }

  private sortByTemperature(forecastRowA: ForecastRow, forecastRowB: ForecastRow, asc: boolean): number {
    let result = 0;

    if (isNaN(forecastRowA.temperature) || isNaN(forecastRowB.temperature)) {
      return 0;
    }

    if (asc) {
      result = forecastRowA.temperature - forecastRowB.temperature;
    } else {
      result = forecastRowB.temperature - forecastRowA.temperature;
    }

    return result;
  }

  private sortByWindSpeed(forecastRowA: ForecastRow, forecastRowB: ForecastRow, asc: boolean): number {
    let result = 0;

    if (isNaN(forecastRowA.windSpeed) || isNaN(forecastRowB.windSpeed)) {
      return 0;
    }

    if (asc) {
      result = forecastRowA.windSpeed - forecastRowB.windSpeed;
    } else {
      result = forecastRowB.windSpeed - forecastRowA.windSpeed;

    }

    return result;
  }

  // #endregion

  private buildFilters(forecast: ForecastParams): Filter[] {
    const filters: Filter[] = [];
    if (forecast.forecast_days) {
      filters.push({ field: 'forecast_days', value: forecast.forecast_days });
    }
    if (forecast.hourly) {
      filters.push({ field: 'hourly', value: forecast.hourly });
    }
    if (forecast.latitude) {
      filters.push({ field: 'latitude', value: forecast.latitude });
    }
    if (forecast.longitude) {
      filters.push({ field: 'longitude', value: forecast.longitude });
    }
    return filters;
  }

  private buildQueryParams(filters?: Filter[]): string {
    let queryParams: string = '';

    filters?.forEach((filter: Filter) =>
      queryParams += `${this.getConcatenation(queryParams)}${filter.field}=${filter.value}`);

    return queryParams;
  }

  private getConcatenation(text: string): string {
    return text === '' ? '?' : '&';
  }

  private mapForecastToRows(forecast: Forecast): ForecastRow[] {
    const forecastRows: ForecastRow[] = [];

    for (let index = 0; index < forecast.hourly.time.length; index++) {
      forecastRows.push({
        time: forecast.hourly.time[index],
        temperature: forecast.hourly.temperature_2m[index],
        windSpeed: forecast.hourly.wind_speed_10m[index]
      });
    }

    return forecastRows;
  }

}
