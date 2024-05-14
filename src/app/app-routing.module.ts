import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationLayoutComponent } from './Authentication/authentication-layout/authentication-layout.component';
import { UserLayoutComponentComponent } from './User/user-layout-component/user-layout-component.component'
const routes: Routes = [
  { path: '', redirectTo: 'l', pathMatch: 'full' },
  {
    path: 'l',
    component: AuthenticationLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./Authentication/authentication.module').then(m => m.AuthenticationModule) },
    ]
  },
  {
    path: 'u',
    component: UserLayoutComponentComponent,
    children: [
      { path: '', loadChildren: () => import('./User/user.module').then(m => m.UserModule) },
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
  { path: '**', redirectTo: 'l' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
