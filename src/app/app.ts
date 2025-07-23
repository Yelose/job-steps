import { DrawerService } from './core/services/drawer-service';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MainToolbar } from './shared/components/main-toolbar/main-toolbar';
import { Footer } from './shared/components/footer/footer';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './core/services/auth-service';
import { SnackbarService } from './shared/services/snackbar-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MainToolbar, Footer, MatSidenavModule, MatListModule,
    MatButtonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private authService = inject(AuthService)
  private drawerService = inject(DrawerService);
  private snackbarService = inject(SnackbarService)
  private router = inject(Router)

  drawerOpen = this.drawerService.isDrawerOpen
  readonly loggedIn = computed(() => !!this.authService.currentUser());

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.snackbarService.show('Sesión cerrada correctamente', 'success')
        this.router.navigate(["/"])
      },
      error: (err) => {
        console.error('Error al cerrar sesión', err);
        this.snackbarService.show('No se pudo cerrar la sesión', 'error');
      },
    });
  }

  closeDrawer() {
    this.drawerService.close()
  }
}
