import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { UserhomeComponent } from './userhome/userhome.component';
import { UserLayoutComponentComponent } from './user-layout-component/user-layout-component.component';
import{ UserRoutingModule } from './user-routing.module';
import { NavComponent } from './nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PermitComponent } from './permit/permit.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    UserhomeComponent,
    UserLayoutComponentComponent,
    NavComponent,
    PermitComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    UserRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
  ]
})
export class UserModule { }
