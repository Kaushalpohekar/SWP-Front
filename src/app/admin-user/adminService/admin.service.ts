import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { EncryptService } from 'src/app/Authentication/AuthService/encrypt.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  private plantChangeSubject = new Subject<void>();
  plantChange$ = this.plantChangeSubject.asObservable();

  private departmentChangeSubject = new Subject<void>();
  departmentChange$ = this.departmentChangeSubject.asObservable();

  private categoryChangeSubject = new Subject<void>();
  categoryChange$ = this.categoryChangeSubject.asObservable();

  notifyPlantChange() {
    this.plantChangeSubject.next();
  }

  notifyCategoryChange() {
    this.categoryChangeSubject.next();
  }

  notifyDepartmentChange() {
    this.departmentChangeSubject.next();
  }

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService, private encryptService: EncryptService) {}

  retrieveUserId(): string {
    const encodedUserId = this.cookieService.get('_user_id');
    return this.encryptService.decryptData(encodedUserId);      
  }

  retrieveOrganizationId(): string {
    const encodedOrgId = this.cookieService.get('_organization_id');
    return this.encryptService.decryptData(encodedOrgId);      
  }

  organizationData(organization_id:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/organizationData/${organization_id}`);
  }

  plantsData(organization_id:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/plantsData/${organization_id}`);
  }

  departmentsData(plant_id:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/departmentsData/${plant_id}`);
  }

  usersDataByDepartments(department_id:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usersDataByDepartments/${department_id}`);
  }

  usersDataByOrganization(organization_id:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usersDataByOrganization/${organization_id}`);
  }

  categoriesData(department_id:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/categoriesData/${department_id}`);
  }

  prevForms(category_id:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/prevForms/${category_id}`);
  }

  formData(id:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/formData/${id}`);
  }

  roles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/roles`);
  }  

  addForm(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addForm`, data);
  }

  addPlant(id:string,data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addPlant/${id}`, data);
  }

  addUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addUser`, data);
  }

  addDepartment(id:string,data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addDepartment/${id}`, data);
  }

  addCategory(id:string,data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addCategory/${id}`, data);
  }
  
  updatePlant(id:string,data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatePlant/${id}`, data);
  }

  updateUser(id:string,data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateUser/${id}`, data);
  }

  updateDepartment(id:string,data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateDepartment/${id}`, data);
  }
  
  deletePlant(id:string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletePlant/${id}`);
  }
  
  deleteDepartment(id:string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteDepartment/${id}`);
  }
  
  deleteUser(id:string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteUser/${id}`);
  }
}