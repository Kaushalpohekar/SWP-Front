import { Component } from '@angular/core';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent {
  cards = [
    { title: 'HWP', subtitle: 'Hot Work Permit', icon: 'home' },
    { title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home' },
    // Add more card data as needed
  ];
}
