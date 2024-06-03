import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService, private EncryptService: EncryptService) {}

  private userType!: string;
  private CompanyEmail!: string;
  private token!: string;

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }

  register(registerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerData);
  }

  forgot(forgotData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot`, forgotData);
  }

  resetPassword(resetData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, resetData);
  }

  getAllTokens(qwerty: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tokens`, qwerty);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  setUserType(userType: string): void {
    this.cookieService.set('_userType', userType, { path: '/' });
  }

  getUserType(): string | null {
    return this.cookieService.get('_userType');
  }

  setToken(token: string): void {
    this.token = token;
    this.cookieService.set('_token', token, { path: '/' });
    this.getUserDetails();
  }

  getToken(): string | null {
    return this.token || this.cookieService.get('_token');
  }

  logout(): void {
    this.cookieService.delete('_token', '/');
    this.cookieService.delete('_userType', '/');
    this.cookieService.delete('_user_id', '/');
    this.router.navigate(['/login/login']);
  }

  private getUserDetails(): void {
    const token = this.getToken();
    if (token && !this.userType) {
      this.http.get(`${this.apiUrl}/user`, { headers: { Authorization: `Bearer ${token}` } })
        .subscribe(
          (user: any) => {
            const userType = user.roleDetails.name; 
            const encodedUserType = this.EncryptService.encryptData(userType);
            this.setUserType(encodedUserType);

            const user_id = user.userDetails.user_id;
            const encodedUserId = this.EncryptService.encryptData(user_id);
            this.cookieService.set('_user_id', encodedUserId, { path: '/' });

            const encodedUserDetails = this.EncryptService.encryptData(user.userDetails);
            this.cookieService.set('_usr_dtls', encodedUserDetails, { path: '/' });
          },
          (error: any) => {
            console.error(error);
          }
        );
    }
  }
}