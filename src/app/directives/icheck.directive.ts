import { Directive, ElementRef, HostListener, Input } from '@angular/core';
declare var $: any;

@Directive({
  selector: '[icheck]'
})

export class IcheckDirective {
    $: any = $;
  constructor(el: ElementRef) {
     this.$(el.nativeElement).iCheck({
            checkboxClass: 'icheckbox_square-aero',
            radioClass: 'iradio_square-aero'
     })
  }
}