import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-title-header',
  imports: [MatDividerModule],
  template: `
    <header>
      <h1>{{title}}</h1>
    </header>
    <mat-divider></mat-divider>
  `,
  styleUrl: './title-header.scss'
})
export class TitleHeader {
  @Input() title: string = "";
}
