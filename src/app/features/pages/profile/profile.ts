import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { OffersService } from '../../../core/services/offers-service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  imports: [MatCardModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  private authService = inject(AuthService)
  private offersService = inject(OffersService)

  readonly user = computed(() => this.authService.currentUser())
  readonly offers = this.offersService.offersSignal

  readonly submittedOffersCount = computed(() => this.offers().filter(o => o.submitted).length)
  readonly pendingOffersCount = computed(() => this.offers().filter((o) => !o.submitted).length)

}
