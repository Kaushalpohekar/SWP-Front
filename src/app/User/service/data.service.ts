import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = environment.apiUrl;
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

}
