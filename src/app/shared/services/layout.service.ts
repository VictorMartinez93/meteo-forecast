import { Injectable, signal } from '@angular/core';
import { Breadcrumb } from '../interfaces/menu/breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public breadcrumb = signal<Breadcrumb[]>([]);

  constructor() { }

}
