import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, computed, inject, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

import { OffersService } from '../../../../core/services/offers-service';
import { SnackbarService } from '../../../../shared/services/snackbar-service';
import { ConfirmDialogService } from '../../../../shared/services/confirm-dialog-service';
import { DateConvertionService } from '../../../../shared/utils/date-convertion-service';
import { AuthService } from '../../../../core/services/auth-service';
import { OfferFormConfigService } from '../../../../core/services/offer-form-config-service';

import { DEFAULT_OFFER_FORM_CONFIG, OfferFormConfig, OfferFieldId, ALL_FIELDS } from '../../../../core/models/offer-field-id';
import { JobOfferInterface } from '../../../../core/models/job-offer-interface';
import { JobOfferStatus, JobOfferStatusModel } from '../../../../core/models/job-offer-status';
import { JobScheduleModel, JobScheduleType } from '../../../../core/models/job-schedule-model';
import { JobContractTypeModel, JobContractType } from '../../../../core/models/job-contract-type-model';

@Component({
  selector: 'app-new-offer',
  imports: [
    ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule,
    MatSelectModule, MatDatepickerModule, MatSlideToggleModule, MatCheckboxModule
  ],
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-offer.html',
  styleUrl: './new-offer.scss'
})
export class NewOffer {
  // servicios
  private fb = inject(NonNullableFormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private confirmDialog = inject(ConfirmDialogService);
  private snack = inject(SnackbarService);
  private router = inject(Router);
  private offers = inject(OffersService);
  private dateSvc = inject(DateConvertionService);
  private auth = inject(AuthService);
  private cfgSvc = inject(OfferFormConfigService);

  // estado
  readonly isEditMode = signal(false);
  private offerId: string | null = null;
  private original = signal<JobOfferInterface | null>(null);
  private allOffers = this.offers.offersSignal;

  // selects
  readonly scheduleOptions = JobScheduleModel.OPTIONS;
  readonly contractTypeOptions = JobContractTypeModel.OPTIONS;
  readonly statusOptions = JobOfferStatusModel.getAll();

  // Sin secciones vacías
  readonly showBasic = computed(() => {
    const v = this.formCfg().visible;
    return v.title || v.company || v.location || v.offerUrl || v.companyUrl || v.date || v.coverLetter || v.submitted;
  });

  readonly showInfo = computed(() => {
    const v = this.formCfg().visible;
    return v.description || v.schedule || v.contractType || v.status || v.companySalary || v.desiredSalary;
  });

  readonly showObjective = computed(() => this.formCfg().visible.personalObjective === true);


  // ===== Config de Firebase (sin effect, sin bucles infinitos) =====
  private _cfgLocal: WritableSignal<OfferFormConfig> = signal(DEFAULT_OFFER_FORM_CONFIG);
  private _cfgLive: WritableSignal<OfferFormConfig> | null = null;

  private get cfgSignal(): WritableSignal<OfferFormConfig> {
    if (!this._cfgLive) {
      const uid = this.auth.currentUser()?.uid ?? '';
      if (uid) this._cfgLive = this.cfgSvc.getConfigSignal(uid);
    }
    return this._cfgLive ?? this._cfgLocal;
  }

  readonly formCfg = computed<OfferFormConfig>(() => this.cfgSignal());

  // ===== Tipado por categorías (sin switch/case) =====
  private readonly STR_FIELDS = new Set<OfferFieldId>([
    'title', 'company', 'location', 'coverLetter', 'description',
    'companySalary', 'desiredSalary', 'personalObjective', 'offerUrl', 'companyUrl'
  ]);
  private readonly DATE_FIELDS = new Set<OfferFieldId>(['date']);
  private readonly BOOL_FIELDS = new Set<OfferFieldId>(['submitted']);

  // validadores dinámicos
  private validatorsFor(control: OfferFieldId, cfg: OfferFormConfig): ValidatorFn[] {
    const v: ValidatorFn[] = [];
    if (cfg.required[control]) v.push(Validators.required);
    if (control === 'offerUrl' || control === 'companyUrl') v.push(Validators.pattern(/^https?:\/\//));
    return v;
  }

  // valor inicial por campo, leyendo this.original()
  private createControl(control: OfferFieldId, validators: ValidatorFn[] = []) {
    const orig = this.original();
    const raw = orig ? (orig as any)[control] : undefined;

    const init =
      this.STR_FIELDS.has(control) ? ((raw as string) ?? '') :
        this.DATE_FIELDS.has(control) ? this.dateSvc.toValidDate(raw) :
          this.BOOL_FIELDS.has(control) ? (typeof raw === 'boolean' ? raw : false) :
            (raw ?? null); // schedule | contractType | status

    return new FormControl(init, { validators });
  }

  // etapa con "name" obligatorio
  private createStageGroup(init?: { name?: string; completed?: boolean; date?: Date | null }): FormGroup {
    return this.fb.group({
      name: this.fb.control((init?.name ?? ''), { validators: [Validators.required] }),
      completed: this.fb.control(!!init?.completed),
      date: new FormControl(this.dateSvc.toValidDate(init?.date)),
    });
  }

  // ===== Form dinámico a partir de la config =====
  readonly offerForm = computed<FormGroup<Record<string, AbstractControl<unknown, unknown>>>>(() => {
    const cfg = this.formCfg();
    const orig = this.original();

    const selectionStagesFA = this.fb.array<FormGroup>(
      (orig?.selectionStages ?? []).map(st => this.createStageGroup({
        name: st.name, completed: st.completed, date: st.date
      }))
    );

    type ControlsDict = Record<string, AbstractControl<unknown, unknown>>;

    const dynamicControls = ALL_FIELDS
      .filter(f => cfg.visible[f])
      .reduce<ControlsDict>((acc, f) => {
        acc[f] = this.createControl(f, this.validatorsFor(f, cfg));
        return acc;
      }, {});

    const controls: ControlsDict = {
      selectionStages: selectionStagesFA,
      newStageName: new FormControl<string | null>(''),
      newStageDate: new FormControl<Date | null>(null),
      ...dynamicControls
    };

    return new FormGroup<ControlsDict>(controls);
  });
  get newStageNameText(): string {
    const v = this.offerForm().get('newStageName')?.value;
    return typeof v === 'string' ? v : '';
  }

  // ===== edición =====
  @Input()
  set id(id: string | null) {
    if (!id) return;
    const found = this.allOffers().find(o => o.id === id);
    if (!found) return;
    this.offerId = id;
    this.original.set(found);
    this.isEditMode.set(true);
  }

  // ===== helpers plantilla =====
  get selectionStagesFA(): FormArray<FormGroup> {
    return this.offerForm().get('selectionStages') as FormArray<FormGroup>;
  }

  addStage() {
    const nameCtrl = this.offerForm().get('newStageName') as FormControl<string | null>;
    const dateCtrl = this.offerForm().get('newStageDate') as FormControl<Date | null>;
    const name = (nameCtrl?.value ?? '').trim();
    const date = dateCtrl?.value ?? null;
    if (!name) return;

    this.selectionStagesFA.push(this.createStageGroup({ name, completed: false, date }));
    nameCtrl?.setValue('');
    dateCtrl?.setValue(null);
    this.cdr.markForCheck();
  }

  removeStage(i: number) {
    this.confirmDialog.confirm('¿Seguro que deseas eliminar esta etapa?').subscribe(ok => {
      if (!ok) return;
      this.selectionStagesFA.removeAt(i);
      this.cdr.markForCheck();
    });
  }

  resetForm() {
    this.confirmDialog.confirm('¿Seguro de que quieres reiniciar el formulario? Esta acción va a borrar todos los campos', 'Borrando formulario')
      .subscribe(ok => { if (ok) { this.offerForm().reset(); this.cdr.markForCheck(); } });
  }

  // ===== envío =====
  submit() {
    const form = this.offerForm();
    if (form.invalid) {
      this.snack.show('Por favor, completa los campos obligatorios', 'error');
      return;
    }

    const cfg = this.formCfg();
    const vis = cfg.visible;
    const f = form.value as Record<string, unknown>;
    const orig = this.original();

    // si el campo es visible → tomamos valor del form (o el previo si edito)
    // si NO es visible → preservamos valor previo (en creación será undefined)
    const take = <T>(k: OfferFieldId, val: T | null | undefined, prev: T | undefined): T | undefined =>
      vis[k] ? (val ?? prev) : prev;

    const stages = this.selectionStagesFA.controls.map(g => ({
      name: g.get('name')?.value ?? '',
      completed: g.get('completed')?.value ?? false,
      date: g.get('date')?.value instanceof Date ? g.get('date')?.value : null
    }));

    const offer: Omit<JobOfferInterface, 'id'> = {
      // obligatorios lógicos del sistema (pero ahora opcionales en el modelo)
      title: take('title', f['title'] as string | null, orig?.title)!,
      company: take('company', f['company'] as string | null, orig?.company)!,
      offerUrl: take('offerUrl', f['offerUrl'] as string | null, orig?.offerUrl),
      companyUrl: take('companyUrl', f['companyUrl'] as string | null, orig?.companyUrl),
      date: take('date', f['date'] as Date | null, orig?.date),
      submitted: take('submitted', f['submitted'] as boolean | null, orig?.submitted),
      status: take('status', f['status'] as JobOfferStatus | null, orig?.status),

      // etapas siempre
      selectionStages: stages,

      // opcionales
      location: take('location', f['location'] as string | null, orig?.location),
      coverLetter: take('coverLetter', f['coverLetter'] as string | null, orig?.coverLetter),
      description: take('description', f['description'] as string | null, orig?.description),
      schedule: take('schedule', f['schedule'] as JobScheduleType | null, orig?.schedule),
      contractType: take('contractType', f['contractType'] as JobContractType | null, orig?.contractType),
      companySalary: take('companySalary', f['companySalary'] as string | null, orig?.companySalary),
      desiredSalary: take('desiredSalary', f['desiredSalary'] as string | null, orig?.desiredSalary),
      personalObjective: take('personalObjective', f['personalObjective'] as string | null, orig?.personalObjective),
    };

    if (this.isEditMode()) {
      if (!this.offerId) { this.snack.show('No se encontró el ID de la oferta', 'error'); return; }
      this.offers.editOffer(this.offerId, offer);
      this.snack.show('Oferta actualizada con éxito', 'success');
    } else {
      this.offers.addOffer(offer);
      this.snack.show('Oferta guardada con éxito', 'success');
    }
    this.router.navigate(['/offers']);
  }

  backToOffers() {
    this.offerForm().reset();
    this.router.navigate(['/offers']);
  }
}
