import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthorizationService} from '../services/authorization.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthorizationService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
