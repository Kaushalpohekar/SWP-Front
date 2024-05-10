import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component'

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import{ AuthenticationRoutingModule } from './authentication-routing.module'



@NgModule({
  declarations: [
    LoginComponent,
    ForgotComponent,
    ResetComponent,
    AuthenticationLayoutComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
