import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';

import { LoadingComponent } from './../loading/loading.component';
import { AlertComponent } from './../alert/alert.component';
import { SpinnerComponent } from './../spinner/spinner.component';
import { EditDetailsComponent } from '../edit-details/edit-details.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { EditContactComponent } from '../edit-contact/edit-contact.component';
import { ChangeProfileComponent } from '../change-profile/change-profile.component';
import { ContactAdminComponent } from '../contact-admin/contact-admin.component';
import { RaiseAnIssueComponent } from '../raise-an-issue/raise-an-issue.component';

@NgModule({
  declarations: [
    LoadingComponent,
    AlertComponent,
    SpinnerComponent,
    EditDetailsComponent,
    ChangePasswordComponent,
    EditContactComponent,
    ChangeProfileComponent,
    ContactAdminComponent,
    RaiseAnIssueComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
    MatGridListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatStepperModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
    MatGridListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatStepperModule,
    MatDialogModule,
    LoadingComponent,
    AlertComponent,
    SpinnerComponent,
    EditDetailsComponent,
    ChangePasswordComponent,
    EditContactComponent,
    ChangeProfileComponent,
    ContactAdminComponent,
    RaiseAnIssueComponent
  ]
})
export class MaterialModule { }
