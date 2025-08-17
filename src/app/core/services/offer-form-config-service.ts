import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ALL_FIELDS, DEFAULT_OFFER_FORM_CONFIG, OfferFieldId, OfferFormConfig } from '../models/offer-field-id';

function allTrue(): Record<OfferFieldId, boolean> {
  return ALL_FIELDS.reduce((acc, k) => { acc[k] = true; return acc; }, {} as Record<OfferFieldId, boolean>);
}

@Injectable({
  providedIn: 'root'
})
export class OfferFormConfigService {
  private firestore = inject(Firestore)
  private destroyRef = inject(DestroyRef)

  private readonly defaultConfig = DEFAULT_OFFER_FORM_CONFIG

  private configDoc(uid: string) {
    return doc(this.firestore, `job-steps/${uid}/settings/offerFormConfig`);
  }

  /** Devuelve una Signal viva que se actualiza con Firestore. */
  getConfigSignal(uid: string) {
    const ref = this.configDoc(uid);
    const configSignal = signal<OfferFormConfig>(this.defaultConfig);

    docData(ref).pipe(
      map(v => (v ? (v as OfferFormConfig) : null)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(async v => {
      if (v == null) {
        // No había doc: creamos el default (todo visible)
        await setDoc(ref, this.defaultConfig, { merge: true });
        configSignal.set(this.defaultConfig);
      } else {
        configSignal.set(this.normalize(v));
      }
    });

    return configSignal;
  }

  private normalize(input: OfferFormConfig): OfferFormConfig {
    return {
      visible: { ...allTrue(), ...(input.visible ?? {}) },
      required: { ...(input.required ?? {}) },
    };
  }

  /** Mutadores locales (no escriben en Firestore) */
  setVisible(config: OfferFormConfig, id: OfferFieldId, value: boolean) {
    config.visible[id] = value;
    if (!value) config.required[id] = false;
  }

  setRequired(config: OfferFormConfig, id: OfferFieldId, value: boolean) {
    if (!config.visible[id] && value) config.visible[id] = true;
    config.required[id] = value;
  }

  /** Persistencia en Firestore */
  upsert(uid: string, cfg: OfferFormConfig) {
    const ref = this.configDoc(uid);
    return setDoc(ref, cfg, { merge: true });     // Promise<void>
  }
}
