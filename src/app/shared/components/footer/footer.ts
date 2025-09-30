import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-footer',
  imports: [MatChipsModule, RouterLink, MatDividerModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {

}
