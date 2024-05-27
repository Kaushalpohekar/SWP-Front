import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserhomeComponent } from './userhome/userhome.component';
import { PermitComponent } from './permit/permit.component';
import { FormComponent } from './form/form.component';
import { FormSelectComponent } from './form-select/form-select.component';

const routes: Routes = [
  { path: 'h', component: UserhomeComponent },
  { path: '', redirectTo: 'h', pathMatch: 'full' },
  { path: 'f/:type', component: PermitComponent },
  { path: 'f/:type/:categoryID', component:FormSelectComponent  },
  { path: 'f/:type/:categoryID/:formId', component:FormComponent  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
