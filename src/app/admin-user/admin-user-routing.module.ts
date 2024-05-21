import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserHomeComponent } from './admin-user-home/admin-user-home.component';
import { AduObservationsComponent } from './adu-observations/adu-observations.component';
import { AduAuditsComponent } from './adu-audits/adu-audits.component';

const routes: Routes = [
  { path: 'home', component: AdminUserHomeComponent },
  { path: 'audits', component: AduAuditsComponent },
  { path: 'observations', component: AduObservationsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserRoutingModule { }
