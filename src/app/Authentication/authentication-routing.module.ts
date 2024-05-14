import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { RegisterComponent } from './register/register.component';
import { AfterRegComponent } from './after-reg/after-reg.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'th', component: AfterRegComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
