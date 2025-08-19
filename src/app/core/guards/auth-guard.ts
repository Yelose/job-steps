import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SnackbarService } from '../../shared/services/snackbar-service';
import { LoadingService } from '../../shared/services/loading-service';
import { Auth, authState } from '@angular/fire/auth';
import { take, map, finalize } from 'rxjs';

export const authGuard: CanActivateFn = (_route, state) => {
  const afAuth = inject(Auth);
  const router = inject(Router);
  const snackbar = inject(SnackbarService);
  const loader = inject(LoadingService)

  loader.show()

  return authState(afAuth).pipe(
    take(1), // espera a que Firebase resuelva la sesión
    map(user => {
      if (user) return true;
      snackbar.show('Debes iniciar sesión para acceder', 'error');
      return router.createUrlTree(['/login'], { queryParams: { redirect: state.url } });
    }),
    finalize(() => loader.hide())
  );
};
