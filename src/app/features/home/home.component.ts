import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../shared/services/layout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private readonly layoutService: LayoutService
  ) {
    layoutService.breadcrumb.set([]);
  }

}
