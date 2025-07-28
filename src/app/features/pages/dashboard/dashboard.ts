import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { UserProfileService } from '../../../core/services/user-profile-service';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private profileService = inject(UserProfileService)

  readonly profile = this.profileService.getProfile();

}
