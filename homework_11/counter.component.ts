import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <input type="button" value="+" (click)="increment()"> {{componentCounterVariable}}
    <input type="button" value="-" (click)="decrement()">
  `,
  styles: []
})
export class CounterComponent {

  @Input() componentCounterVariable: number;
  @Output() onCounterChange = new EventEmitter();

  constructor() {}

  increment() {
    this.componentCounterVariable ++;
    this.onCounterChange.emit(1);
  }

  decrement() {
    this.componentCounterVariable --;
    this.onCounterChange.emit(-1);
  }

}
