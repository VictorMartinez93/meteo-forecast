import { SafeHtml } from '@angular/platform-browser';

export interface MenuItem {
    label: string;
    icon?: SafeHtml;
    routerLink?: string;
    children?: MenuItem[];
}
