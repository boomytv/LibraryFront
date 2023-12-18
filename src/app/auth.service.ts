import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';

  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string): Observable<any> {
    const body = { username, email, password };
    return this.http.post(`${this.apiUrl}/auth/signup`, body);
  }

  // register(data: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, data);
  // }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/auth/signin`, body);
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    const body = { refreshToken };
    return this.http.post(`${this.apiUrl}/auth/refreshtoken`, body);
  }

  logout(): void {
    if (this.isLocalStorageSupported()) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.refreshTokenKey);
    }
  }

  setTokens(tokens: any): void {
    if (this.isLocalStorageSupported()) {
      localStorage.setItem(this.tokenKey, tokens.accessToken);
      localStorage.setItem(this.refreshTokenKey, tokens.refreshToken);
    }
  }

  getAccessToken(): string | null {
    return this.isLocalStorageSupported() ? localStorage.getItem(this.tokenKey) : null;
  }

  getRefreshToken(): string | null {
    return this.isLocalStorageSupported() ? localStorage.getItem(this.refreshTokenKey) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  getRoles(): any {
    const currentAccessToken = this.getAccessToken();

    if(currentAccessToken !== null){
      const decodedToken = jwt_decode.jwtDecode(currentAccessToken);
      const userRoles: string[] = (decodedToken as any)['roles'];

      return userRoles;
    } else {
      return null;
    }
  }

  getUserId(): any {
    const currentAccessToken = this.getAccessToken();

    if(currentAccessToken !== null){
      const decodedToken = jwt_decode.jwtDecode(currentAccessToken);
      const userId = decodedToken.sub;

      return userId;
    } else {
      return null;
    }
  }

  isAdmin(): boolean {
    const currentAccessToken = this.getAccessToken();

    if(currentAccessToken !== null){
      const decodedToken = jwt_decode.jwtDecode(currentAccessToken);
      const userRoles: string[] = (decodedToken as any)['roles'];

      const roleNames = userRoles.map((role: any) => role.name);


      if(roleNames.includes("ROLE_ADMIN")){
        return true;
      }
      return false;
    } else {
      return false;
    }
  }
  isWorker(): boolean {
    const currentAccessToken = this.getAccessToken();

    if(currentAccessToken !== null){
      const decodedToken = jwt_decode.jwtDecode(currentAccessToken);
      const userRoles: string[] = (decodedToken as any)['roles'];

      const roleNames = userRoles.map((role: any) => role.name);

      return roleNames.includes("ROLE_WORKER");

    } else {
      return false;
    }
  }
  private isLocalStorageSupported(): boolean {
    return typeof localStorage !== 'undefined';
  }
}
