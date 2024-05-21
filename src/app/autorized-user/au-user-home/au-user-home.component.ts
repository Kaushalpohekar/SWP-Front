import { Component } from '@angular/core';

@Component({
  selector: 'app-au-user-home',
  templateUrl: './au-user-home.component.html',
  styleUrls: ['./au-user-home.component.css']
})
export class AuUserHomeComponent {
  cards = [
    { title: 'HWP', subtitle: 'Hot Work Permit', icon: 'home' },
    { title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home' },
    // Add more card data as needed
  ];
}
