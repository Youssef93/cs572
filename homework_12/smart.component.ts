import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-smart',
  template: `

    <ul>
      <li *ngFor="let item of items" appIsVisible [show]=item.show> 
        <app-dumb  [item]="item" >
        </app-dumb>
      </li>
    </ul>

  `,
  styles: []
})
export class SmartComponent implements OnInit {
  public items: object[];

  constructor() {
    this.items = [{
      name: 'i1',
      show: true
    }, {
      name: 'i2',
      show: true
    }, {
      name: 'i3',
      show: false
    }];
  }

  ngOnInit() {
  }


}
