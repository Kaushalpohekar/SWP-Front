import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component'

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import{ AuthenticationRoutingModule } from './authentication-routing.module'
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


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
    AuthenticationRoutingModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf,
    MatButtonModule, MatDividerModule, MatIconModule,
    
  ]
})
export class AuthenticationModule { }
