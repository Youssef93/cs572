import { Directive, HostListener, HostBinding, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appMakeBigger]'
})
export class MakeBiggerDirective {

  @HostListener('dblclick') fn() {
    const size = parseInt(this.e.nativeElement.style.fontSize.split('px')[0])
    this.e.nativeElement.style.fontSize = size + 2 + 'px';
  }

  elemetRef: ElementRef;
  renderer: Renderer2;

  constructor(private e: ElementRef, private r: Renderer2) {
    this.elemetRef = e;
    this.renderer = r;
  }

}
