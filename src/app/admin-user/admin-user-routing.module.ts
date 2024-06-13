import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserHomeComponent } from './admin-user-home/admin-user-home.component';
import { AduObservationsComponent } from './adu-observations/adu-observations.component';
import { AduAuditsComponent } from './adu-audits/adu-audits.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminFormsComponent } from './admin-forms/admin-forms.component';

const routes: Routes = [
  { path: 'home', component: AdminUserHomeComponent },
  { path: 'home/users/:id', component: AdminUserComponent },
  { path: 'home/users/:id/forms/:dep_id', component: AdminFormsComponent },
  { path: 'audits', component: AduAuditsComponent },
  { path: 'observations', component: AduObservationsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserRoutingModule { }
