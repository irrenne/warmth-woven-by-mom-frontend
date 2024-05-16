import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthorizationService} from "../../services/authorization.service";

@Component({
  selector: 'app-admin-app-component',
  templateUrl: './admin-app-component.component.html',
  styleUrls: ['./admin-app-component.component.css']
})
export class AdminAppComponentComponent {
  constructor(private router: Router, public authService: AuthorizationService) {
  }

  checkUserIsAdmin(): boolean {
    if (this.authService.isLoggedIn()) {
      return this.authService.isAdmin()
    }
    return false;
  }

  redirectToHome() {
    if (this.checkUserIsAdmin()) {
      this.router.navigate(['/']);
    }
  }

  redirectToLogin() {
    if (this.checkUserIsAdmin()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/all/orders']);
    }
  }

  redirectToOrders() {
    if (this.checkUserIsAdmin()) {
      this.router.navigate(['/all/orders']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
