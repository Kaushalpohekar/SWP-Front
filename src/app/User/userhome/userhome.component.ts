import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})

export class UserhomeComponent {
  cards!: any[];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getCards().subscribe(cards => {
      this.cards = cards;
    });
  }

  onCardClick(formId: string): void {
    this.router.navigate(['/u/f', formId]);
  }
}
