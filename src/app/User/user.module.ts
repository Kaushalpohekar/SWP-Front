import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserhomeComponent } from './userhome/userhome.component';
import { UserLayoutComponentComponent } from './user-layout-component/user-layout-component.component';
import { UserRoutingModule } from './user-routing.module';
import { NavComponent } from './nav/nav.component';
import { PermitComponent } from './permit/permit.component';
import { MaterialModule } from '../material/material.module';
import { FormComponent } from './form/form.component';
import { SelectComponent } from './select/select.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { Select2Component } from './select2/select2.component';
import { UserAddComponent } from './user-add/user-add.component';

@NgModule({
  declarations: [
    UserhomeComponent,
    UserLayoutComponentComponent,
    NavComponent,
    PermitComponent,
    FormComponent,
    SelectComponent,
    FormSelectComponent,
    UserProfileComponent,
    Select2Component,
    UserAddComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule
  ]
})
export class UserModule { }
