import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { UserProfileService } from '../../../core/services/user-profile-service';
import { NoticeModel } from '../../../shared/utils/models/notice-model';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private profileService = inject(UserProfileService)

  readonly profile = this.profileService.getProfile();
  notice: Partial<NoticeModel> = {
    title: "Ofertas sin enviar",
    subtitle: "Tienes CV sin enviar en algunas ofertas",
    notices: [],
    type: "info",
  }

}
