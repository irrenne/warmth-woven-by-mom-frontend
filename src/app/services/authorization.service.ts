import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(
  ) {
  }

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

  removeJwtToken(): void {
    localStorage.removeItem('jwtToken');
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  getBearerToken(): string {
    const token = this.getJwtToken();
    return `Bearer ${token}`;
  }
}
