import { Injectable, signal, inject, computed } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth)
  private userSignal = toSignal<User | null>(authState(this.auth), { initialValue: null })

  readonly currentUser = computed(() => this.userSignal())
  readonly isLoggedIn = computed(() => !!this.userSignal())

  get user(): User | null {
    return this.userSignal()
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password))
  }

  register(name: string, email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({ user }) => updateProfile(user, { displayName: name }))
    )
  }

  logout() {
    return from(this.auth.signOut())
  }
}
