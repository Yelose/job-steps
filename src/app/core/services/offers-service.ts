import { signal, computed, inject, Injectable, effect } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth-service';
import { JobOfferInterface } from '../models/job-offer-interface';
import { DateConvertionService } from '../../shared/utils/date-convertion-service';
import { JobOfferDisplayModel } from '../models/job-offer-display-model';
import { TextFormattingService } from '../../shared/services/text-formatting-service';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private user = computed(() => this.authService.currentUser());
  private dateService = inject(DateConvertionService);
  private textFormatter = inject(TextFormattingService);

  private offersCollection = computed(() => {
    const user = this.authService.user;
    return user ? collection(this.firestore, `job-steps/${user.uid}/offers`) : null;
  });

  readonly offersSignal = signal<JobOfferDisplayModel[]>([]);

  constructor() {
    effect((onCleanup) => {
      const col = this.offersCollection();
      if (!col) {
        this.offersSignal.set([]);
        return;
      }

      const sub = collectionData(col, { idField: 'id' }).subscribe((data) => {
        const parsed = (data as JobOfferInterface[]).map(offer => this.parseOffer(offer));
        this.offersSignal.set(parsed);
      });

      onCleanup(() => sub.unsubscribe());
    });
  }

  addOffer(offer: Omit<JobOfferInterface, 'id'>) {
    const col = this.offersCollection();
    if (!col) throw new Error("Usuario no autenticado");
    const prepared = this.prepareForFirestore(offer);
    addDoc(col, prepared);
  }

  editOffer(id: string, offer: Omit<JobOfferInterface, 'id'>) {
    const user = this.user();
    if (!user) throw new Error("Usuario no autenticado");
    const ref = doc(this.firestore, `job-steps/${user.uid}/offers/${id}`);
    const prepared = this.prepareForFirestore(offer);
    updateDoc(ref, prepared);
  }

  deleteOffer(id: string) {
    const user = this.user();
    if (!user) throw new Error("Usuario no autenticado");
    const ref = doc(this.firestore, `job-steps/${user.uid}/offers/${id}`);
    deleteDoc(ref);
  }

  // Transforma datos de Firestore → para vista
  private parseOffer(offer: JobOfferInterface): JobOfferDisplayModel {
    const patched: JobOfferInterface = {
      ...offer,
      date: this.dateService.toValidDate(offer.date) ?? null as any, // si tu interfaz aún pide Date estricto, cámbiala a Date | null
      selectionStages: offer.selectionStages?.map(st => ({
        ...st,
        date: this.dateService.toValidDate(st.date)
      })) ?? []
    };
    return new JobOfferDisplayModel(patched, this.textFormatter.toLineArray);
  }
  // 🔧 helper: elimina undefined de forma profunda (objetos/arrays)
  stripUndefined<T extends Record<string, any>>(obj: T): T {
    const out: any = {};
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (v !== undefined) out[k] = v;
    }
    return out;
  }

  // 🔄 vista → Firestore
  private prepareForFirestore(offer: Omit<JobOfferInterface, 'id'>) {
    const prepared = {
      ...offer,
      date: this.dateService.toValidDate(offer.date ?? null),
      selectionStages: (offer.selectionStages ?? []).map(st => ({
        ...st,
        date: this.dateService.toValidDate(st.date ?? null)
      }))
    };
    return this.stripUndefined(prepared);
  }
}
