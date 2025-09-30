import { Component } from '@angular/core';
import { TitleHeader } from '../../../shared/components/title-header/title-header';
import { PageWrapper } from '../../../shared/wrappers/page-wrapper/page-wrapper';

@Component({
  selector: 'app-not-found',
  imports: [TitleHeader, PageWrapper],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFound {

}
