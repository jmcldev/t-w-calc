import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DeflectionComponent } from './deflection/deflection.component';
import { ResultComponent } from './result/result.component';

import { ResultsService } from './results.service';


@NgModule({
  declarations: [
    AppComponent,
    DeflectionComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ResultsService],
  bootstrap: [AppComponent, DeflectionComponent, ResultComponent]
})
export class AppModule { }
