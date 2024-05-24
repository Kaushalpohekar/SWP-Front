import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private cards = [
    { formId: '48afd8d5-46b2-4736-b9ba-ae983cfae510', title: 'HWP', subtitle: 'Hot Work Permit', icon: 'home' },
    { formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un', title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home' },
    // Add more card data as needed
  ];

  private forms = [
    { formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un', title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home', formUID: 'CWP000001', organaztion: 'senselive', startDate: '20-04-2023', startTime: '02:00:00', endDate: '21-04-2023', endTime: '02:00:00', name: 'Welding and Firing Work need permission and take permission', worker: '1' },
    { formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un', title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home', formUID: 'CWP000002', organaztion: 'senselive', startDate: '21-04-2023', startTime: '02:00:00', endDate: '21-04-2023', endTime: '04:00:00', name: 'Watering plant permission', worker: '2' },
    { formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un', title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home', formUID: 'CWP000001', organaztion: 'senselive', startDate: '20-04-2023', startTime: '02:00:00', endDate: '21-04-2023', endTime: '02:00:00', name: 'Welding and Firing Work need permission and take permission', worker: '1' },
    { formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un', title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home', formUID: 'CWP000002', organaztion: 'senselive', startDate: '21-04-2023', startTime: '02:00:00', endDate: '21-04-2023', endTime: '04:00:00', name: 'Watering plant permission', worker: '2' },
    { formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un', title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home', formUID: 'CWP000001', organaztion: 'senselive', startDate: '20-04-2023', startTime: '02:00:00', endDate: '21-04-2023', endTime: '02:00:00', name: 'Welding and Firing Work need permission and take permission', worker: '1' },
    { formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un', title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home', formUID: 'CWP000002', organaztion: 'senselive', startDate: '21-04-2023', startTime: '02:00:00', endDate: '21-04-2023', endTime: '04:00:00', name: 'Watering plant permission', worker: '2' },
    { formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un', title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home', formUID: 'CWP000001', organaztion: 'senselive', startDate: '20-04-2023', startTime: '02:00:00', endDate: '21-04-2023', endTime: '02:00:00', name: 'Welding and Firing Work need permission and take permission', worker: '1' },
    { formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un', title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home', formUID: 'CWP000002', organaztion: 'senselive', startDate: '21-04-2023', startTime: '02:00:00', endDate: '21-04-2023', endTime: '04:00:00', name: 'Watering plant permission', worker: '2' },
    { formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un', title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home', formUID: 'CWP000001', organaztion: 'senselive', startDate: '20-04-2023', startTime: '02:00:00', endDate: '21-04-2023', endTime: '02:00:00', name: 'Welding and Firing Work need permission and take permission', worker: '1' },
    { formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un', title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home', formUID: 'CWP000002', organaztion: 'senselive', startDate: '21-04-2023', startTime: '02:00:00', endDate: '21-04-2023', endTime: '04:00:00', name: 'Watering plant permission', worker: '2' },
    { formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un', title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home', formUID: 'CWP000001', organaztion: 'senselive', startDate: '20-04-2023', startTime: '02:00:00', endDate: '21-04-2023', endTime: '02:00:00', name: 'Welding and Firing Work need permission and take permission', worker: '1' },
    { formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un', title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home', formUID: 'CWP000002', organaztion: 'senselive', startDate: '21-04-2023', startTime: '02:00:00', endDate: '21-04-2023', endTime: '04:00:00', name: 'Watering plant permission', worker: '2' },
    { formId: '48afd8d5-46b2-4736-b9ba-ae983cfae510', title: 'HWP', subtitle: 'Hot Work Permit', icon: 'home', formUID: 'CWP000001', organaztion: 'senselive', startDate: '20-04-2023', startTime: '02:00:00', endDate: '21-04-2023', endTime: '02:00:00', name: 'Welding and Firing Work need permission and take permission', worker: '1' },
    { formId: '48afd8d5-46b2-4736-b9ba-ae983cfae510', title: 'HWP', subtitle: 'Hot Work Permit', icon: 'person', formUID: 'CWP000002', organaztion: 'senselive', startDate: '21-04-2023', startTime: '02:00:00', endDate: '21-04-2023', endTime: '04:00:00', name: 'Watering plant permission', worker: '2' },
  ];

  private questions = [
    { 
      formId: '48afd8d5-46b2-4736-b9ba-ae983cfae510',
      id: 1,
      text: 'What is your favorite color?',
      type: 'multipleChoice',
      options: ['yes', 'Blue', 'N/A'],
      answer: 'yes'
    },
    { 
      formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un',
      id: 2,
      text: 'What is your age?',
      type: 'shortAnswer',
      answer: '22 Yrs'
    },
    { 
      formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un',
      id: 3,
      text: 'Tell us about yourself',
      type: 'longAnswer',
      answer: 'My Name is Kaushal.qwertyui wertyuiko,lp, xsrcdvftgybmji,kolsdcrvfgbnhmjk,sxdcvfgbmjk,sdcfnhumjk'
    },
    { 
      formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un',
      id: 4,
      text: 'What is Your gender?',
      options: ['Female', 'Male', 'Other'],
      type: 'selectAnswer',
      answer: 'Male'
    },
    { 
      formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un',
      id: 5,
      text: 'What is your favorite color?',
      type: 'multipleChoice',
      options: ['yes', 'Blue', 'N/A',],
      answer: 'yes'
    },
    { 
      formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un',
      id: 5,
      text: 'What is your favorite color?',
      type: 'multipleChoice',
      options: ['yes', 'Blue', 'N/A',],
      answer: 'Blue'
    },
    { 
      formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un',
      id: 5,
      text: 'What is your favorite color?',
      type: 'multipleChoice',
      options: ['yes', 'Blue', 'N/A',],
      answer: 'N/A'
    },
    { 
      formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un',
      id: 6,
      text: 'What is your favorite color?',
      type: 'checkbox',
      options: ['yes', 'Blue', 'N/A'],
      answer: ['yes', 'Blue']
    },
    { 
      formId: '48afd8d5-46b2-4736-b9ba-x4e56h8un',
      id: 6,
      text: 'What is your favorite color?',
      type: 'upload',
      options: ['yes', 'Blue', 'N/A'],
      answer: 'upload.pdf'
    },
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

  getForms(): Observable<any[]> {
    return of(this.forms);
  }
}
