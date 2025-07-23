import { Injectable, signal, inject, computed } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { setDoc, doc, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firestore = inject(Firestore)
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
      switchMap(({ user }) =>
        from(updateProfile(user, { displayName: name })).pipe(
          switchMap(() =>
            from(setDoc(doc(this.firestore, `job-steps/${user.uid}`), {
              displayName: name,
              email,
              createdAt: new Date()
            }))
          )
        )
      )
    );
  }

  logout() {
    return from(this.auth.signOut())
  }
}
