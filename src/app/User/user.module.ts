import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserhomeComponent } from './userhome/userhome.component';
import { UserLayoutComponentComponent } from './user-layout-component/user-layout-component.component';
import{ UserRoutingModule } from './user-routing.module';
import { NavComponent } from './nav/nav.component';
import { PermitComponent } from './permit/permit.component';
import { MaterialModule } from '../material/material.module';
import { PrimeModule } from '../material/prime.module';
import { FormComponent } from './form/form.component';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [
    UserhomeComponent,
    UserLayoutComponentComponent,
    NavComponent,
    PermitComponent,
    FormComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    PrimeModule
  ]
})
export class UserModule { }
