import { Component } from '@angular/core';
import { LayoutService } from '../../shared/services/layout.service';
import { SessionStorageService } from '../../shared/services/session-storage.service';
import { CONSTANTS } from '../../core/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private readonly layoutService: LayoutService,
    private readonly sessionStorageService: SessionStorageService
  ) {
    layoutService.breadcrumb.set([]);
  }

  public eraseWeatherData(): void {
    this.sessionStorageService.remove(CONSTANTS.FORECAST_KEY);
  }

  public eraseForm(): void {
    this.sessionStorageService.remove(CONSTANTS.FORM_STATUS);
  }

  public clearSession(): void {
    this.sessionStorageService.clear();
  }

  public a11yColor(): void {
    const body = document.body;
    const theme: string = 'a11y';
    if (body.classList.contains(theme)) {
      body.classList.remove(theme);
    } else {
      body.classList.add(theme);
    }
  }

}
