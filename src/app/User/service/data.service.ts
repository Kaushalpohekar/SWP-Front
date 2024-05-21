import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private cards = [
    { formId: '48afd8d5-46b2-4736-b9ba-ae983cfae510', title: 'HWP', subtitle: 'Hot Work Permit', icon: 'home' },
    { formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un', title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home' },
    // Add more card data as needed
  ];

  private questions = [
    { 
      formId: '48afd8d5-46b2-4736-b9ba-ae983cfae510',
      id: 1,
      text: 'What is your favorite color?',
      type: 'multipleChoice',
      options: ['Red', 'Blue', 'Green'],
      answer: ''
    },
    { 
      formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un',
      id: 2,
      text: 'What is your age?',
      type: 'shortAnswer',
      answer: ''
    },
    { 
      formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un',
      id: 3,
      text: 'Tell us about yourself',
      type: 'longAnswer',
      answer: ''
    }
  ];

  constructor() { }

  getCards(): Observable<any[]> {
    // Simulate fetching data from the backend
    return of(this.cards);
  }

  getQuestions(): Observable<any[]> {
    // Simulate fetching data from the backend
    return of(this.questions);
  }

}
