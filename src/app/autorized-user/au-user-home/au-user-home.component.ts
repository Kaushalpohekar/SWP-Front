import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-au-user-home',
  templateUrl: './au-user-home.component.html',
  styleUrls: ['./au-user-home.component.css']
})
export class AuUserHomeComponent {
  cards!: any[];

  constructor(private serviceService: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.serviceService.getCards().subscribe(cards => {
      this.cards = cards;
    });
  }

  onCardClick(formId: string): void {
    this.router.navigate(['/au/permit', formId]);
  }
}
