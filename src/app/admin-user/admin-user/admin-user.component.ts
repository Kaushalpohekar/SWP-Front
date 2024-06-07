import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent {
  
  revertedArray: any[] = ['Name','UserName','Role','Contact','Action'];
  dataSource: any[] = [];

  cards = [
    { title: 'HWP', subtitle: 'Hot Work Permit', icon: 'home' },
    { title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home' },
  ];

  transformString(input: string): string {
    let transformedStr = input.replace(/_/g, ' ');
    transformedStr = transformedStr.replace(/\b\w/g, match => match.toUpperCase());
    transformedStr = transformedStr.replace(/\b\w{1,4}\b/g, match => match.toUpperCase());
    return transformedStr;
  }
}
