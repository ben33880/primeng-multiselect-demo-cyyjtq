import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { MultiSelectModule } from 'primeng/multiselect';
import { TreeModule } from 'primeng/tree';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MultiSelectModule,
    FormsModule,
    HttpClientModule,
    TreeModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
