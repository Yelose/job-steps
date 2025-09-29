import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { TitleHeader } from '../../../../shared/components/title-header/title-header';

@Component({
  selector: 'app-legal-policy',
  imports: [MatDividerModule, TitleHeader],
  templateUrl: './legal-policy.html',
  styleUrl: './legal-policy.scss'
})
export class LegalPolicy {

}
