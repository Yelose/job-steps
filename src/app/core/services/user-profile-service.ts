import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth-service';
import { UserProfileModel } from '../models/user-profile-model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  private profileDoc = computed(() => {
    const user = this.authService.user;
    return user ? doc(this.firestore, `job-steps/${user.uid}`) : null;
  });

  readonly profileSignal = signal<UserProfileModel>({
    uid: '',
    displayName: '',
    email: ''
  });

  // Este effect se ejecuta automáticamente al instanciar el servicio
  // y se encarga de mantener sincronizado el perfil del usuario
  private _ = effect((onCleanup) => {
    const ref = this.profileDoc();
    if (!ref) {
      this.profileSignal.set({ uid: '', displayName: '', email: '' });
      return;
    }

    const sub = docData(ref).subscribe((data) => {
      this.profileSignal.set(data as UserProfileModel);
    });

    onCleanup(() => sub.unsubscribe());
  });

  getProfile() {
    return this.profileSignal
  }

  editProfile(data: Partial<UserProfileModel>) {
    const ref = this.profileDoc();
    if (!ref) throw new Error('Usuario no autenticado');
    return updateDoc(ref, data);
  }


}
