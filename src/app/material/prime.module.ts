import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DropdownModule,
    
  ],
  exports: [ 
    DropdownModule,
  ]
})
export class PrimeModule { }