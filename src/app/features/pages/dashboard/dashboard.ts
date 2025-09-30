import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OfferFormConfigService } from '../../../core/services/offer-form-config-service';
import { DEFAULT_OFFER_FORM_CONFIG, OfferFieldId, OfferFormConfig } from '../../../core/models/offer-field-id';
import { SnackbarService } from '../../../shared/services/snackbar-service';
import { AuthService } from '../../../core/services/auth-service';
import { TitleHeader } from '../../../shared/components/title-header/title-header';
import { PageWrapper } from '../../../shared/wrappers/page-wrapper/page-wrapper';

@Component({
  selector: 'app-dashboard',
  imports: [TitleHeader, PageWrapper, MatButtonModule, RouterLink, MatSlideToggleModule, MatCheckboxModule, MatButtonModule,],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private auth = inject(AuthService);
  private cfgService = inject(OfferFormConfigService);
  private snackbar = inject(SnackbarService);

  // 1) cache interno
  private _cfg: WritableSignal<OfferFormConfig> = signal<OfferFormConfig>(DEFAULT_OFFER_FORM_CONFIG);
  private _isLive = false;

  // 2) getter que cambia a Firestore la primera vez que haya uid
  get cfg(): WritableSignal<OfferFormConfig> {
    if (!this._isLive) {
      const uid = this.auth.currentUser()?.uid ?? '';
      if (uid) {
        this._cfg = this.cfgService.getConfigSignal(uid); // <-- señal VIVA de Firestore
        this._isLive = true;
      }
    }
    return this._cfg; // en plantilla usas cfg() como siempre
  }

  toggleVisible(id: OfferFieldId, checked: boolean) {
    const c = structuredClone(this.cfg());         // lee valor actual
    this.cfgService.setVisible(c, id, checked);    // muta objeto
    this.cfg.set(c);                               // emite
  }

  toggleRequired(id: OfferFieldId, checked: boolean) {
    const c = structuredClone(this.cfg());
    this.cfgService.setRequired(c, id, checked);
    this.cfg.set(c);
  }

  save() {
    const uid = this.auth.currentUser()?.uid ?? '';
    if (!uid) { this.snackbar.show('No hay UID', 'error'); return; }
    this.cfgService.upsert(uid, this.cfg())
      .then(() => this.snackbar.show('Configuración guardada', 'success'))
      .catch(() => this.snackbar.show('Error al guardar la configuración', 'error'));
  }
}
