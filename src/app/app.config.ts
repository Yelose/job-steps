import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { firebaseCredentials } from '../environments/firebase-credentials';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(),
      withInMemoryScrolling({
        // Para subir siempre arriba al cambiar de ruta:
        scrollPositionRestoration: 'top',
        // (opcional) para hacer scroll a #ancla si hay fragmento en la URL:
        anchorScrolling: 'enabled',
      })),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(
      firebaseCredentials)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
