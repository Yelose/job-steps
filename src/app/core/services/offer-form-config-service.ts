import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { OfferFieldId, OfferFormConfig } from '../models/offer-field-id';

@Injectable({
  providedIn: 'root'
})
export class OfferFormConfigService {
  private firestore = inject(Firestore)
  private destroyRef = inject(DestroyRef)

  private readonly defaultConfig: OfferFormConfig = {
    visible: {
      title: true, company: true, offerUrl: true, companyUrl: true,
      date: true, location: true, schedule: true, contractType: true,
      submitted: true, status: true, coverLetter: false, description: false,
      companySalary: false, desiredSalary: false, personalObjective: false,
    },
    required: {
      title: true, company: true, offerUrl: true, companyUrl: true
    }
  }

  /**
     * Devuelve una Signal viva que se actualiza con Firestore.
     */
  getConfigSignal(uid: string) {
    const ref = doc(this.firestore, `users/${uid}/settings/offerFormConfig`)
    const configSignal = signal<OfferFormConfig>(this.defaultConfig)

    docData(ref).pipe(
      map((v) => (v ? (v as OfferFormConfig) : this.defaultConfig)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((v) => configSignal.set(v))
    return configSignal
  }

  getVisible(config: OfferFormConfig, id: OfferFieldId, value: boolean) {
    config.visible[id] = value;
    if (!value) config.required[id] = false
  }

  setRequired(config: OfferFormConfig, id: OfferFieldId, value: boolean) {
    if (!config.visible[id] && value) config.visible[id] = true
    config.required[id] = value
  }
}
