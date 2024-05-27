import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserLayoutComponent } from './admin-user-layout/admin-user-layout.component';
import { AdminUserNavComponent } from './admin-user-nav/admin-user-nav.component';
import { AdminUserHomeComponent } from './admin-user-home/admin-user-home.component';
import{ AdminUserRoutingModule } from './admin-user-routing.module';
import { MaterialModule } from '../material/material.module';
import { AduObservationsComponent } from './adu-observations/adu-observations.component';
import { AduAuditsComponent } from './adu-audits/adu-audits.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AdminUserLayoutComponent,
    AdminUserNavComponent,
    AdminUserHomeComponent,
    AduObservationsComponent,
    AduAuditsComponent
  ],
  imports: [
    CommonModule,
    AdminUserRoutingModule,
    MaterialModule,
    HighchartsChartModule
  ]
})
export class AdminUserModule { }
