import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuUserHomeComponent } from './au-user-home/au-user-home.component';
import { AuUserPermitComponent } from './au-user-permit/au-user-permit.component';
import { AuUserFormComponent } from './au-user-form/au-user-form.component';
import { AuUserFormPreviewComponent } from './au-user-form-preview/au-user-form-preview.component';
import { AuUserProfileComponent } from './au-user-profile/au-user-profile.component';


const routes: Routes = [
  { path: 'home', component: AuUserHomeComponent },
  { path: 'f/:type', component: AuUserPermitComponent},
  { path: 'Preview/:submission_id', component: AuUserFormPreviewComponent},
  { path: 'f/:type/:categoryID', component:AuUserFormComponent  },
  { path: 'profile', component:AuUserProfileComponent  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorizedUserRoutingModule { }
