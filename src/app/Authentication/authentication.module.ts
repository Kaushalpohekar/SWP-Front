import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component'

import { MaterialModule } from '../material/material.module';
import{ AuthenticationRoutingModule } from './authentication-routing.module';
import { RegisterComponent } from './register/register.component';
import { AfterRegComponent } from './after-reg/after-reg.component';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
    LoginComponent,
    ForgotComponent,
    ResetComponent,
    AuthenticationLayoutComponent,
    RegisterComponent,
    AfterRegComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
