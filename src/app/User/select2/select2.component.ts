import { Component, Input, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-select2',
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        maxHeight: '200px', // Adjust as needed
      })),
      state('closed', style({
        opacity: 0,
        maxHeight: '0',
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
    ])
  ]
})
export class Select2Component implements OnInit {
  @Input() options: any[] = []; // Accepts any type of array
  @Input() displayField: string = ''; // Field to display in options
  @Input() valueField: string = ''; // Field to use as selected value
  @Input() selectedOption: any | null = null; // Allows for pre-selected option
  @Output() optionSelected = new EventEmitter<any>();

  dropdownOpen = false;

  ngOnInit() {
    // Perform any initialization here if needed
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: any) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
    this.dropdownOpen = false;
  }

  isDropdownClosed() {
    return !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.dropdownOpen) {
      const targetElement = event.target as HTMLElement;
      if (!targetElement.closest('.custom-dropdown')) {
        this.dropdownOpen = false;
      }
    }
  }
}
