import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = environment.apiUrl;
  private types = [
    { id: 'observations', name: 'Observations' },
    { id: 'incidents', name: 'Incidents' },
    { id: 'permits', name: 'Permits' },
    { id: 'action', name: 'Action' },
    { id: 'audits', name: 'Audits' }
  ];

  constructor(private http: HttpClient) {}
  
  getTypes(): Observable<any[]> {
    return of(this.types);
  }
  
  getAllCaterogy(formType: string, department_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getCategories/${department_id}/${formType}`);
  }

  getAllForms(category_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getForms/${category_id}`);
  }

  getQuestions(formId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getQuestions/${formId}`);
  }

  getAuthorizer(department_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAuthorizers/${department_id}`);
  }

  submitFormData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/insertDetails`, data);
  }

  getFormsList(user_id: string, interval: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getSubmissionByInterval/${user_id}/${interval}`);
  }

  getFormsListCount(user_id: string, interval: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getSubmissionByIntervalCount/${user_id}/${interval}`);
  }

  getSubmissionDetails(submission_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getSubmissionDetails/${submission_id}`);
  }

  getProfileDetails(user_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/profileDetails/${user_id}`);
  }

  getSubmissionCount(formType: string, user_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getSubmissionCount/${formType}/${user_id}`);
  }
}
