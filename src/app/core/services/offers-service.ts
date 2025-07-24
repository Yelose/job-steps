import { signal, computed, inject, Injectable, effect } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, DocumentData, Firestore } from '@angular/fire/firestore';
import { AuthService } from './auth-service';
import { JobOfferInterface } from '../models/job-offer-interface';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private firestore = inject(Firestore)
  private authService = inject(AuthService)
  private user = computed(() => this.authService.currentUser())

  private offersCollection = computed(() => {
    const user = this.authService.currentUser();
    return user ? collection(this.firestore, `job-steps/${user.uid}/offers`) : null;
  });

  readonly offersSignal = signal<JobOfferInterface[]>([]);

  constructor() {
    effect((onCleanup) => {
      const col = this.offersCollection();
      if (!col) {
        this.offersSignal.set([]);
        return;
      }

      const sub = collectionData(col, { idField: 'id' }).subscribe((data) => {
        this.offersSignal.set(data as JobOfferInterface[]);
      });

      onCleanup(() => sub.unsubscribe());
    });
  }

  addOffer(offer: Omit<JobOfferInterface, 'id'>) {
    const col = this.offersCollection();
    if (!col) throw new Error("Usuario no autenticado");
    addDoc(col, offer);
  }

  deleteOffer(id: string) {
    const user = this.user();
    if (!user) throw new Error("Usuario no autenticado");
    const ref = doc(this.firestore, `job-steps/${user.uid}/offers/${id}`);
    deleteDoc(ref);
  }
}
