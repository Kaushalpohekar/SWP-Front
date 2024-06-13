import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { UserRoutingModule } from './user-routing.module';

import { ConfirmSubmitComponent } from './confirm-submit/confirm-submit.component';
import { FormComponent } from './form/form.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { LoadingComponent } from './../loading/loading.component';
import { NavComponent } from './nav/nav.component';
import { PermitComponent } from './permit/permit.component';
import { SelectComponent } from './select/select.component';
import { Select2Component } from './select2/select2.component';
import { SpinnerComponent } from './../spinner/spinner.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { UserLayoutComponentComponent } from './user-layout-component/user-layout-component.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserViewComponent } from './user-view/user-view.component';

@NgModule({
  declarations: [
    ConfirmSubmitComponent,
    FormComponent,
    FormSelectComponent,
    LoadingComponent,
    NavComponent,
    PermitComponent,
    SelectComponent,
    Select2Component,
    SpinnerComponent,
    UserAddComponent,
    UserhomeComponent,
    UserLayoutComponentComponent,
    UserProfileComponent,
    UserViewComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule
  ],
  providers:[
    DatePipe
  ] 
})
export class UserModule { }
