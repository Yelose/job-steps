import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { SnackbarService } from '../../shared/services/snackbar-service';

export const authGuard: CanActivateFn = (_route, _state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const snackbar = inject(SnackbarService);

  const loggedIn = auth.isLoggedIn();

  if (!loggedIn) {
    snackbar.show('Debes iniciar sesión para acceder', 'error');
    router.navigate(['/login']);
    return false;
  }

  return true;
};
