import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserHomeComponent } from './admin-user-home/admin-user-home.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminFormsComponent } from './admin-forms/admin-forms.component';

const routes: Routes = [
  { 
    path: 'home', 
    component: AdminUserHomeComponent, 
    data: { breadcrumb: 'Home' }
  },
  { 
    path: 'home/users/:id', 
    component: AdminUserComponent,
    data: { breadcrumb: 'Users' }
  },
  { 
    path: 'home/users/:id/forms/:dep_id', 
    component: AdminFormsComponent,
    data: { breadcrumb: 'Forms' }
  },
  { 
    path: '**', 
    redirectTo: 'home', 
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserRoutingModule { }