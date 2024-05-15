import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuUserLayoutComponent } from './au-user-layout/au-user-layout.component';
import { AuUserNavComponent } from './au-user-nav/au-user-nav.component';
import { MaterialModule } from '../material/material.module';
import { AuUserHomeComponent } from './au-user-home/au-user-home.component';
import{ AutorizedUserRoutingModule } from './autorized-user-routing.module';

@NgModule({
  declarations: [
    AuUserLayoutComponent,
    AuUserNavComponent,
    AuUserHomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AutorizedUserRoutingModule
  ]
})
export class AutorizedUserModule { }
