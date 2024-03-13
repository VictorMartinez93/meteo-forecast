import { ForecastRow } from '../forecast/forecast-row';

export interface Column {
    label: string;
    name: keyof ForecastRow;
    asc?: boolean;
}
