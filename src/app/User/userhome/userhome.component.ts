import { Component } from '@angular/core';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent {
  cards = [
    { title: 'Card 1', subtitle: 'Subtitle 1', icon: 'home' },
    { title: 'Card 2', subtitle: 'Subtitle 2', icon: 'user' },
    // Add more card data as needed
  ];
}
