import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { OffersService } from '../../../../core/services/offers-service';
import { JobOfferDisplayModel } from '../../../../core/models/job-offer-display-model';
import { DateConvertionService } from '../../../../shared/utils/date-convertion-service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { JobOfferStatusModel } from '../../../../core/models/job-offer-status';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-view-offer',
  imports: [MatExpansionModule, MatChipsModule, MatCardModule, MatIconModule, MatDividerModule,
    MatListModule
  ],
  templateUrl: './view-offer.html',
  styleUrl: './view-offer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewOffer {
  private offersService = inject(OffersService);
  private allOffers = this.offersService.offersSignal;
  private dateService = inject(DateConvertionService);

  readonly offer = signal<JobOfferDisplayModel | null>(null);
  readonly panelOpenState = signal(false);

  @Input()
  set id(id: string | null) {
    if (!id) return;
    const offer = this.allOffers().find(o => o.id === id);
    if (!offer) return;
    this.offer.set(offer);
  }

  toShortDate(date: Date) {
    return this.dateService.toShortDate(date);
  }

  getStatusModel(status: string): JobOfferStatusModel | undefined {
    return JobOfferStatusModel.getAll().find(s => s.value === status);
  }
}
