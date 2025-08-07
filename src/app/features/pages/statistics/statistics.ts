import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OffersService } from '../../../core/services/offers-service';
import { JobOfferStatus, JobOfferStatusModel } from '../../../core/models/job-offer-status';

@Component({
  selector: 'app-statistics',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './statistics.html',
  styleUrl: './statistics.scss'
})
export class Statistics {
  private offersService = inject(OffersService)
  readonly offers = this.offersService.offersSignal;
  readonly statuses = JobOfferStatusModel.getAll()

  countByStatus(status: JobOfferStatus): number {
    return this.offers().filter(offer => offer.status === status).length
  }

}
