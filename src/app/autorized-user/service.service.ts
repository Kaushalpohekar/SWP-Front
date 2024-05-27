import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private cards = [
  // Permits
  { categoryID: '48afd8d5-46b2-4736-b9ba-ae983cfae510', title: 'HWP', subtitle: 'Hot Work Permit', icon: 'whatshot', type: 'permits' },
  { categoryID: '48afd8d5-46b2-4736-b9ba-x4e56h8un', title: 'CWP', subtitle: 'Cold Work Permit', icon: 'ac_unit', type: 'permits' },
  { categoryID: '48afd8d5-46b2-4736-b9ba-000000000001', title: 'EWP', subtitle: 'Electrical Work Permit', icon: 'flash_on', type: 'permits' },
  { categoryID: '48afd8d5-46b2-4736-b9ba-000000000002', title: 'GWP', subtitle: 'General Work Permit', icon: 'build', type: 'permits' },
  
  // Observations
  { categoryID: '1234abcd-1234-abcd-1234-abcdef123456', title: 'SO', subtitle: 'Safety Observation', icon: 'visibility', type: 'observations' },
  { categoryID: '5678efgh-5678-efgh-5678-efgh5678ijkl', title: 'QO', subtitle: 'Quality Observation', icon: 'check_circle', type: 'observations' },
  { categoryID: '1234abcd-1234-abcd-1234-000000000001', title: 'BO', subtitle: 'Behavioral Observation', icon: 'people', type: 'observations' },
  { categoryID: '1234abcd-1234-abcd-1234-000000000002', title: 'EO', subtitle: 'Environmental Observation', icon: 'eco', type: 'observations' },
  
  // Audits
  { categoryID: '9101ijkl-9101-ijkl-9101-ijkl9101mnop', title: 'SA', subtitle: 'Safety Audit', icon: 'assignment', type: 'audits' },
  { categoryID: '1121mnop-1121-mnop-1121-mnop1121qrst', title: 'QA', subtitle: 'Quality Audit', icon: 'list_alt', type: 'audits' },
  { categoryID: '9101ijkl-9101-ijkl-9101-000000000001', title: 'HA', subtitle: 'Health Audit', icon: 'healing', type: 'audits' },
  { categoryID: '9101ijkl-9101-ijkl-9101-000000000002', title: 'EA', subtitle: 'Environmental Audit', icon: 'nature_people', type: 'audits' },
  
  // Incidents
  { categoryID: '3141qrst-3141-qrst-3141-qrst3141uvwx', title: 'SI', subtitle: 'Safety Incident', icon: 'warning', type: 'incidents' },
  { categoryID: '5161uvwx-5161-uvwx-5161-uvwx5161yzab', title: 'QI', subtitle: 'Quality Incident', icon: 'error', type: 'incidents' },
  { categoryID: '3141qrst-3141-qrst-3141-000000000001', title: 'HI', subtitle: 'Health Incident', icon: 'local_hospital', type: 'incidents' },
  { categoryID: '3141qrst-3141-qrst-3141-000000000002', title: 'EI', subtitle: 'Environmental Incident', icon: 'public', type: 'incidents' },
  
  // Actions
  { categoryID: '48afd8d5-46b2-4736-b9ba-ae983cfae510', title: 'HWP', subtitle: 'Hot Work Permit', icon: 'whatshot', type: 'action' },
  { categoryID: '48afd8d5-46b2-4736-b9ba-x4e56h8un', title: 'CWP', subtitle: 'Cold Work Permit', icon: 'ac_unit', type: 'action' },
  { categoryID: '48afd8d5-46b2-4736-b9ba-000000000001', title: 'RA', subtitle: 'Risk Assessment', icon: 'assessment', type: 'action' },
  { categoryID: '48afd8d5-46b2-4736-b9ba-000000000002', title: 'CA', subtitle: 'Corrective Action', icon: 'build_circle', type: 'action' }
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

  getCards2(type: string): Observable<any[]> {
    // Filter cards by the given type
    const filteredCards = this.cards.filter(card => card.type === type);
    return of(filteredCards);
  }

  getQuestions(): Observable<any[]> {
    // Simulate fetching data from the backend
    return of(this.questions);
  }

  getForms(): Observable<any[]> {
    return of(this.forms);
  }
}
