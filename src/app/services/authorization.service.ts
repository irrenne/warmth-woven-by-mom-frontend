import {Injectable} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private jwtHelper: JwtHelperService) {}

  getJwtToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  setJwtToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  setJwtAccessToken(token: string): void {
    localStorage.setItem('jwtAccessToken', token);
  }

  getJwtAccessToken(): string | null {
    return localStorage.getItem('jwtAccessToken');
  }

  getCurrentUserId(): string | null {
    const token = this.getJwtAccessToken();
    return token ? this.jwtHelper.decodeToken(token).id : null;
  }

  removeJwtToken(): void {
    localStorage.removeItem('jwtToken');
  }

  logout(): void{
    this.removeJwtToken()
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  getBearerToken(): string {
    const token = this.getJwtToken();
    return `Bearer ${token}`;
  }
}
