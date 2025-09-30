import { Component } from '@angular/core';
import { TitleHeader } from '../../../shared/components/title-header/title-header';
import { PageWrapper } from '../../../shared/wrappers/page-wrapper/page-wrapper';

@Component({
  selector: 'app-stages',
  imports: [TitleHeader, PageWrapper],
  templateUrl: './stages.html',
  styleUrl: './stages.scss'
})
export class Stages {

}
