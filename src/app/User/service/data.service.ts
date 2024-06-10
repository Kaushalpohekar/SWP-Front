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

  getAllCaterogy(formType: string, department_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getCategories/${department_id}/${formType}`);
  }

  getAllForms(category_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getForms/${category_id}`);
  }

  getQuestions(formId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getQuestions/${formId}`);
  }

  private data = [
    { user_id: 'qeiqio34-vfjn3-vfvmmnd', first_name: 'Kaushal'},
    { user_id: 'qeiqio34-sdcsd-dsmmnd', first_name: 'Niket'}
  ];

  getTypes(): Observable<any[]> {
    return of(this.types);
  }
  getAuthorizer(): Observable<any[]> {
    // Simulate fetching data from the backend
    return of(this.data);
  }
}
