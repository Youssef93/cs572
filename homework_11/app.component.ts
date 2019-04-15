import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-counter [componentCounterVariable]=componentCounterVariable (onCounterChange)="changeCounter($event)"></app-counter>
    <p> Value of counter in main app is {{componentCounterVariable}}</p>
  `
})
export class AppComponent {
  componentCounterVariable = 0;
  title = 'demo';

  changeCounter(value) {
    this.componentCounterVariable += value;
  }
}
