import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuUserLayoutComponent } from './au-user-layout/au-user-layout.component';
import { AuUserNavComponent } from './au-user-nav/au-user-nav.component';
import { MaterialModule } from '../material/material.module';
import { AuUserHomeComponent } from './au-user-home/au-user-home.component';
import{ AutorizedUserRoutingModule } from './autorized-user-routing.module';
import { AuUserFormComponent } from './au-user-form/au-user-form.component';
import { SuccessComponent } from './success/success.component';
import { AuUserFormPreviewComponent } from './au-user-form-preview/au-user-form-preview.component';
import { AuUserPermitComponent } from './au-user-permit/au-user-permit.component';

@NgModule({
  declarations: [
    AuUserLayoutComponent,
    AuUserNavComponent,
    AuUserHomeComponent,
    AuUserFormComponent,
    SuccessComponent,
    AuUserFormPreviewComponent,
    AuUserPermitComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AutorizedUserRoutingModule
  ]
})
export class AutorizedUserModule { }
