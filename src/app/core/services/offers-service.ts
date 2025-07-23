import { signal, computed, inject, Injectable } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private firestore = inject(Firestore)
  private auth = inject(AuthService)

  private userId = signal<string | null>(null)


  constructor() {
  }

  private readonly offersRef = collection(
    this.firestore, `job-steps/${this.userId}/offers`
  )


}
