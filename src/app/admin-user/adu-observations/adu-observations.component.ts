import { Component, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-adu-observations',
  templateUrl: './adu-observations.component.html',
  styleUrls: ['./adu-observations.component.css']
})
export class AduObservationsComponent {
  @ViewChild('picker') picker!: MatDatepicker<Date>;

  openDatePicker() {
    this.picker.open();
  }
}
