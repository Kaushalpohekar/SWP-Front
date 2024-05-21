import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserhomeComponent } from './userhome/userhome.component';
import { PermitComponent } from './permit/permit.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: 'h', component: UserhomeComponent },
  { path: '', redirectTo: 'h', pathMatch: 'full' },
  { path: 'permit', component: PermitComponent },
  { path: 'f/:formId', component:FormComponent  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
