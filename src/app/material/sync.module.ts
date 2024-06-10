import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DatePickerModule

  ],
  exports: [ 
    DatePickerModule
  ]
})
export class SyncModule { }