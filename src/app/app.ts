import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainToolbar } from './shared/components/main-toolbar/main-toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainToolbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'job-steps';

}
