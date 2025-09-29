import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { TitleHeader } from '../../../../shared/components/title-header/title-header';

@Component({
  selector: 'app-cookies',
  imports: [MatDividerModule, TitleHeader],
  templateUrl: './cookies.html',
  styleUrl: './cookies.scss'
})
export class Cookies {

}
