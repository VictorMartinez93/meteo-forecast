/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ForecastService } from './forecast.service';

describe('Service: Forecast', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForecastService]
    });
  });

  it('should ...', inject([ForecastService], (service: ForecastService) => {
    expect(service).toBeTruthy();
  }));
});
