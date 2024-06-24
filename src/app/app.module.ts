import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'; // Import HashLocationStrategy
import { OverlayModule } from '@angular/cdk/overlay';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmSnackBarComponent } from './confirm-snack-bar/confirm-snack-bar.component';
import { RouterModule } from '@angular/router'; 

@NgModule({
  declarations: [
    AppComponent,
    ConfirmSnackBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    OverlayModule,
    RouterModule // Import RouterModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy } // Provide HashLocationStrategy
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
