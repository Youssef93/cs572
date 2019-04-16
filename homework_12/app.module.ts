import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IsVisibleDirective } from './is-visible.directive';
import { MakeBiggerDirective } from './make-bigger.directive';
import { DumbComponent } from './dumb.component';
import { SmartComponent } from './smart.component';

@NgModule({
  declarations: [
    AppComponent,
    IsVisibleDirective,
    MakeBiggerDirective,
    DumbComponent,
    SmartComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
