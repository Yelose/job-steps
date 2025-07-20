import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DrawerService } from '../../../core/services/drawer-service';

@Component({
  selector: 'app-main-toolbar',
  imports: [MatToolbarModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './main-toolbar.html',
  styleUrl: './main-toolbar.scss'
})
export class MainToolbar {
  private drawerService = inject(DrawerService)
  toggleDrawer(): void {
    this.drawerService.toggle()
  }
}
