import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DropdownModule,
    
  ],
  exports: [ 
    DropdownModule,
    ToolbarModule, 
    ButtonModule, 
    SplitButtonModule, 
    InputTextModule
  ]
})
export class PrimeModule { }