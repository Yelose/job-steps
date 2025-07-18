import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main-toolbar',
  imports: [MatToolbarModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './main-toolbar.html',
  styleUrl: './main-toolbar.scss'
})
export class MainToolbar {

}
