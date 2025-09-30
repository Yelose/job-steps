import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { TitleHeader } from '../../../../shared/components/title-header/title-header';
import { PageWrapper } from '../../../../shared/wrappers/page-wrapper/page-wrapper';

@Component({
  selector: 'app-legal-policy',
  imports: [MatDividerModule, TitleHeader, PageWrapper],
  templateUrl: './legal-policy.html',
  styleUrl: '../legal.scss'
})
export class LegalPolicy {

}
