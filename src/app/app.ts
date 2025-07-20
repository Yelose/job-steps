import { DrawerService } from './core/services/drawer-service';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MainToolbar } from './shared/components/main-toolbar/main-toolbar';
import { Footer } from './shared/components/footer/footer';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MainToolbar, Footer, MatSidenavModule, MatListModule,
    MatButtonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private drawerService = inject(DrawerService);
  drawerOpen = this.drawerService.isDrawerOpen
  loggedIn = false
  logout() { }
  closeDrawer() {
    this.drawerService.close()
  }
}
