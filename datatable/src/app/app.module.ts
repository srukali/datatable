import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ApiService } from './shared/api.service';
import { AppComponent } from './app.component';
import { DatatableModule } from './datatable/datatable.module';

import { StoreModule } from '@ngrx/store';
import { datatableReducer } from './datatable/datatable.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    DatatableModule,
    StoreModule.forRoot({ count: datatableReducer })
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
