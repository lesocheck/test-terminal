import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';


import { AppComponent } from './app.component';
import { OperatorsComponent } from './components/operators/operators.component';
import { OperatorDetailComponent } from './components/operator-detail/operator-detail.component';

import { ApiService } from './services/api.service';


@NgModule({
  declarations: [
    AppComponent,
    OperatorsComponent,
    OperatorDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    TextMaskModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
