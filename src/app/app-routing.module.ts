import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationLayoutComponent } from './Authentication/authentication-layout/authentication-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: AuthenticationLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./Authentication/authentication.module').then(m => m.AuthenticationModule) },
    ]
  },
  // {
  //   path: 'dash',
  //   component: DashLayoutComponent,
  //   children: [
  //     { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  //   ]
  // },
  // {
  //   path: 'sa',
  //   component: SALayoutComponent,
  //   children: [
  //     { path: '', loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule) },
  //   ]
  // },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
