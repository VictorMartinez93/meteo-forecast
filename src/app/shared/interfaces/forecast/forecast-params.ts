import { EForecastParams } from '../../enums/e-forecast-params.enum';

export interface ForecastParams {
    latitude: number[];
    longitude: number[];
    forecast_days: number;
    hourly: EForecastParams[];
}
