import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationLayoutComponent } from './Authentication/authentication-layout/authentication-layout.component';
import { UserLayoutComponentComponent } from './User/user-layout-component/user-layout-component.component'
import { AuUserLayoutComponent } from './autorized-user/au-user-layout/au-user-layout.component';
import { AdminUserLayoutComponent } from './admin-user/admin-user-layout/admin-user-layout.component';
import { SuperAdminLayoutComponent } from './super-admin/super-admin-layout/super-admin-layout.component';

import{ AuthGuard } from './Authentication/guard/auth.guard';
import{ RoleGuard } from './Authentication/guard/role.guard';
import{ LoginGuard } from './Authentication/guard/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'l', pathMatch: 'full' },
  {
    path: 'l',
    component: AuthenticationLayoutComponent,
    canActivate: [LoginGuard],
    children: [
      { path: '', loadChildren: () => import('./Authentication/authentication.module').then(m => m.AuthenticationModule) },
    ]
  },
  {
    path: 'u',
    component: UserLayoutComponentComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Standard'] },
    children: [
      { path: '', loadChildren: () => import('./User/user.module').then(m => m.UserModule) },
    ]
  },
  {
    path: 'au',
    component: AuUserLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Authorizer'] },
    children: [
      { path: '', loadChildren: () => import('./autorized-user/autorized-user.module').then(m => m.AutorizedUserModule) },
    ]
  },
  {
    path: 'ad',
    component: AdminUserLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] },
    children: [
      { path: '', loadChildren: () => import('./admin-user/admin-user.module').then(m => m.AdminUserModule) },
    ]
  },
  {
    path: 'sa',
    component: SuperAdminLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['SuperAdmin'] },
    children: [
      { path: '', loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule) },
    ]
  },
  { path: '**', redirectTo: 'l' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
