import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthorizationService} from "../../services/authorization.service";

@Component({
  selector: 'app-user-app-component',
  templateUrl: './user-app-component.component.html',
  styleUrls: ['./user-app-component.component.css']
})
export class UserAppComponentComponent {
  constructor(private router: Router, public authService: AuthorizationService) {
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

  redirectToLogin() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/orders']);
    }
  }

  redirectToOrders() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/orders']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
