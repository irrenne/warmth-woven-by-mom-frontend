import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from "../services/http.service";
import {AuthorizationService} from "../services/authorization.service";

@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.css']
})
export class UserLoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(
    private http: HttpService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {
  }

  login(): void {
    const requestBody = {
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:9191/auth/login', requestBody)
    .subscribe({
      next: (response) => {
        this.authorizationService.setJwtToken(response);
        this.authorizationService.setJwtAccessToken(response.accessToken);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
