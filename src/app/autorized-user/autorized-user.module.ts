import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AuUserLayoutComponent } from './au-user-layout/au-user-layout.component';
import { AuUserNavComponent } from './au-user-nav/au-user-nav.component';
import { MaterialModule } from '../material/material.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { AuUserHomeComponent } from './au-user-home/au-user-home.component';
import{ AutorizedUserRoutingModule } from './autorized-user-routing.module';
import { AuUserFormComponent } from './au-user-form/au-user-form.component';
import { AuUserFormPreviewComponent } from './au-user-form-preview/au-user-form-preview.component';
import { AuUserPermitComponent } from './au-user-permit/au-user-permit.component';
import { Select2Component } from './select2/select2.component';

import { AuUserApproveComponent } from './au-user-approve/au-user-approve.component';
import { AuUserRejectComponent } from './au-user-reject/au-user-reject.component';
import { AuUserProfileComponent } from './au-user-profile/au-user-profile.component';

@NgModule({
  declarations: [
    AuUserLayoutComponent,
    AuUserNavComponent,
    AuUserHomeComponent,
    AuUserFormComponent,
    AuUserFormPreviewComponent,
    AuUserPermitComponent,
    Select2Component,
    AuUserApproveComponent,
    AuUserRejectComponent,
    AuUserProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AutorizedUserRoutingModule,
    HighchartsChartModule
  ],
  providers:[
    DatePipe
  ] 
})
export class AutorizedUserModule { }
