import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuUserHomeComponent } from './au-user-home/au-user-home.component';


const routes: Routes = [
  { path: 'home', component: AuUserHomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorizedUserRoutingModule { }
