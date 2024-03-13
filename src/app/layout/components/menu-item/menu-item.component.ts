import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../../../shared/interfaces/menu/menu-item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  @Input() menuItem!: MenuItem;

  constructor() { }

}
