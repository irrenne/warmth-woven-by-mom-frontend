import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import {AuthorizationService} from "../services/authorization.service";

@Component({
  selector: 'app-user-registration-page',
  templateUrl: './user-registration-page.component.html',
  styleUrls: ['./user-registration-page.component.css']
})
export class UserRegistrationPageComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
      private http: HttpService,
      private authorizationService: AuthorizationService,
      private router: Router
  ) {}

  register(): void {
    const requestBody = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:9191/auth/register', requestBody)
    .subscribe({
      next: (response: any) => {
        console.log('Registration successful:', response);
        this.authorizationService.setJwtToken(response);
        this.authorizationService.setJwtAccessToken(response.accessToken);
        this.router.navigate(['']);
      },
      error: (error: any) => {
        console.error('Error during registration:', error);
      }
    });
  }
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
