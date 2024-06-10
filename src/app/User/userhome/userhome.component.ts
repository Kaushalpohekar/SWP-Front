import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', status: 'Approved'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', status: 'Approved'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', status: 'Approved'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', status: 'Approved'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', status: 'Approved'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', status: 'Approved'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', status: 'Approved'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', status: 'Approved'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', status: 'Approved'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', status: 'Approved'},
];

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})

export class UserhomeComponent {
  cards!: any[];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status'];
  dataSource = ELEMENT_DATA;
}
