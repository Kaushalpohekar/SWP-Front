import { Component, EventEmitter, Output, OnInit } from '@angular/core';

interface CalendarDate {
  day: number | null;
  selected: boolean;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Output() dateSelected = new EventEmitter<Date>();
  currentMonth: number;
  currentYear: number;
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  dates: CalendarDate[] = [];

  constructor() {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
  }

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    this.dates = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      this.dates.push({ day: null, selected: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      this.dates.push({ day: i, selected: false });
    }
  }

  selectDate(index: number) {
    this.dates.forEach(date => date.selected = false);
    if (this.dates[index].day !== null) {
      this.dates[index].selected = true;
      const selectedDate = new Date(this.currentYear, this.currentMonth, this.dates[index].day!);
      this.dateSelected.emit(selectedDate);
    }
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }
}
