import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { EncryptService } from 'src/app/Authentication/AuthService/encrypt.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;
  private cardData: any;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService, private encryptService: EncryptService) {}

  // setCardData(data: any) {
  //   this.cardData = data;
  // }

  // getCardData() {
  //   return this.cardData;
  // }

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

  roles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/roles`);
  }
  
}
