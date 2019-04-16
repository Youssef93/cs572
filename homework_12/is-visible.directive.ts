import { Directive, ElementRef, Renderer2, HostListener, HostBinding, Input, OnInit } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';

@Directive({
  selector: '[appIsVisible]'
})

export class IsVisibleDirective implements OnInit {
  @Input('show') show: boolean;

  elemetRef: ElementRef;
  renderer: Renderer2;

  constructor(private e: ElementRef, private r: Renderer2) {
    this.elemetRef = e;
    this.renderer = r;
  }

  ngOnInit() {
    if(this.show == false) {
      this.renderer.setStyle(this.elemetRef.nativeElement, 'display', 'none');
    }
  }

}
