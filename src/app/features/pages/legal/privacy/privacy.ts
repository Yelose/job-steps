import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { TitleHeader } from '../../../../shared/components/title-header/title-header';

@Component({
  selector: 'app-privacy',
  imports: [MatDividerModule, TitleHeader],
  templateUrl: './privacy.html',
  styleUrl: './privacy.scss'
})
export class Privacy {

}
