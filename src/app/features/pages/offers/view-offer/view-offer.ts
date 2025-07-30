import { ChangeDetectionStrategy, Component, computed, inject, Input, signal } from '@angular/core';
import { OffersService } from '../../../../core/services/offers-service';
import { JobOfferInterface } from '../../../../core/models/job-offer-interface';
import { DateConvertionService } from '../../../../shared/utils/date-convertion-service';
import { DatePipe } from '@angular/common';
import { TextFormattingService } from '../../../../shared/services/text-formatting-service';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-view-offer',
  imports: [DatePipe, MatExpansionModule],
  templateUrl: './view-offer.html',
  styleUrl: './view-offer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewOffer {
  private offersService = inject(OffersService)
  private allOffers = this.offersService.offersSignal
  private dateService = inject(DateConvertionService)
  private textFormatter = inject(TextFormattingService)
  readonly offer = signal<JobOfferInterface | null>(null)
  readonly panelOpenState = signal(false);


  readonly formattedCoverLetter = computed(() => {
    const raw = this.offer()?.coverLetter ?? ''
    return this.textFormatter.toLineArray(raw)
  });

  readonly formattedObjective = computed(() => {
    const raw = this.offer()?.personalObjective ?? ''
    return this.textFormatter.toLineArray(raw)
  });

  readonly formattedOfferDescription = computed(() => {
    const raw = this.offer()?.description ?? ''
    return this.textFormatter.toLineArray(raw)
  })

  @Input()
  set id(id: string | null) {
    if (!id) return;
    const offer = this.allOffers().find(o => o.id === id);
    if (!offer) return;
    // Asegúrate de que las fechas sean Date válidas si las vas a formatear
    const patched = {
      ...offer,
      date: this.dateService.toValidDate(offer.date),
      selectionStages: offer.selectionStages?.map(stage => ({
        ...stage,
        date: stage.date ? this.dateService.toValidDate(stage.date) : undefined
      })) ?? []
    };
    this.offer.set(patched);
  }

}
