import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OffersService } from '../../../core/services/offers-service';
import { JobOfferStatus, JobOfferStatusModel } from '../../../core/models/job-offer-status';
import { TitleHeader } from '../../../shared/components/title-header/title-header';
import { PageWrapper } from '../../../shared/wrappers/page-wrapper/page-wrapper';

@Component({
  selector: 'app-statistics',
  imports: [TitleHeader, PageWrapper, MatCardModule, MatIconModule],
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
