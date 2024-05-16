import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthorizationService} from "./services/authorization.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthorizationService) {
  }

  checkUserIsAdmin(): boolean {
    if (this.authService.isLoggedIn()) {
      return this.authService.isAdmin()
    }
    return false;
  }
}
