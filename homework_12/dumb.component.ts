import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dumb',
  template: `
    <p [ngStyle]="{'font-size':'20px'}" appMakeBigger>
      {{item.name}}
    </p>
  `
})
export class DumbComponent implements OnInit {
  @Input() item: { name: string, show: boolean}

  constructor() {
    
  }

  ngOnInit() {
  }

}
