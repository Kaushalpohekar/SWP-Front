import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserLayoutComponent } from './admin-user-layout/admin-user-layout.component';
import { AdminUserNavComponent } from './admin-user-nav/admin-user-nav.component';
import { AdminUserHomeComponent } from './admin-user-home/admin-user-home.component';
import{ AdminUserRoutingModule } from './admin-user-routing.module';
import { MaterialModule } from '../material/material.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminFormsComponent } from './admin-forms/admin-forms.component';
import { AdminBreadcrumsComponent } from './admin-breadcrums/admin-breadcrums.component';
import { InsertUpdateComponent } from './admin-user-layout/insert-update/insert-update.component';

@NgModule({
  declarations: [
    AdminUserLayoutComponent,
    AdminUserNavComponent,
    AdminUserHomeComponent,
    AdminUserComponent,
    AdminFormsComponent,
    AdminBreadcrumsComponent,
    InsertUpdateComponent
  ],
  imports: [
    CommonModule,
    AdminUserRoutingModule,
    MaterialModule,
    HighchartsChartModule
  ]
})
export class AdminUserModule { }
