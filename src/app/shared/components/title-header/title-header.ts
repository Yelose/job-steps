import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-title-header',
  imports: [MatDividerModule],
  template: `
    <header>
      <h1>{{title}}</h1>
      <h2>{{subtitle}}</h2>
      <mat-divider></mat-divider>
    </header>
  `,
  styleUrl: './title-header.scss'
})
export class TitleHeader {
  @Input() title: string = "";
  @Input() subtitle?: string = "";
}
