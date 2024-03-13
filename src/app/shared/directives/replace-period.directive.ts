import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[replacePeriod]'
})
export class ReplacePeriodDirective {

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('input') onInput() {
    this.el.nativeElement.value = this.el.nativeElement.value?.replace('.', ',');
  }

}
