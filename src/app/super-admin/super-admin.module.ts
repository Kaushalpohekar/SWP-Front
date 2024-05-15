import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminLayoutComponent } from './super-admin-layout/super-admin-layout.component';
import { SuperAdminNavComponent } from './super-admin-nav/super-admin-nav.component';
import { SuperAdminHomeComponent } from './super-admin-home/super-admin-home.component';
import { MaterialModule } from '../material/material.module';
import{ SuperAdminRoutingModule } from './super-admin-routing.module';

@NgModule({
  declarations: [
    SuperAdminLayoutComponent,
    SuperAdminNavComponent,
    SuperAdminHomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SuperAdminRoutingModule
  ]
})
export class SuperAdminModule { }
