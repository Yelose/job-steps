import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NoticeModel } from '../../utils/models/notice-model';

@Component({
  selector: 'app-notice-component',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './notice-component.html',
  styleUrl: './notice-component.scss'
})
export class NoticeComponent {
  @Input() notice!: NoticeModel;

}
