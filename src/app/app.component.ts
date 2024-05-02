import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthorizationService} from "./services/authorization.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthorizationService) {
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
}
