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

  getQuestions(formId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getQuestions/${formId}`);
  }

  submitFormData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/insertDetails`, data);
  }

  getFormsList(category_id: string, user_id: string, interval: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getSubmissionByIntervalAuthorizer/${category_id}/${user_id}/${interval}`);
  }

  getSubmissionDetails(submission_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getSubmissionDetails/${submission_id}`);
  }

  approveSubmission(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/approveSubmission`, data);
  }

  rejectSubmission(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/rejectSubmission`, data);
  }

  getProfileDetails(user_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/profileDetails/${user_id}`);
  }

  getSubmissionCount(formType: string, user_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getSubmissionCountAuth/${formType}/${user_id}`);
  }

  getFormTypeBar(user_id: string, interval: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getFormTypeBar/${user_id}/${interval}`);
  }

  getFormTypePercentages(user_id: string, interval: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getFormTypePercentages/${user_id}/${interval}`);
  }

  getStatusCounts(user_id: string, interval: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getStatusCounts/${user_id}/${interval}`);
  }

  getApprovedCounts(user_id: string, interval: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getApprovedCounts/${user_id}/${interval}`);
  }

  insertSign(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signature`, data);
  }
}
