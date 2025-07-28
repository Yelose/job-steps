import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogService } from '../../../../shared/services/confirm-dialog-service';
import { OffersService } from '../../../../core/services/offers-service';
import { JobOfferInterface } from '../../../../core/models/job-offer-interface';
import { SnackbarService } from '../../../../shared/services/snackbar-service';
import { MatSelectModule } from '@angular/material/select';
import { JobContractType, JobContractTypeModel } from '../../../../core/models/job-contract-type-model';
import { JobScheduleModel, JobScheduleType } from '../../../../core/models/job-schedule-model';
import { DateConvertionService } from '../../../../shared/utils/date-convertion-service';

@Component({
  selector: 'app-new-offer',
  imports: [MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatSelectModule,
    ReactiveFormsModule, MatDatepickerModule, MatSlideToggleModule, MatCheckboxModule],
  providers: [provideNativeDateAdapter(),
  { provide: MAT_DATE_LOCALE, useValue: 'es-ES' } // importante para que la fecha aparezca DD/MM/AAAA
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-offer.html',
  styleUrl: './new-offer.scss'
})
export class NewOffer {
  fb = inject(NonNullableFormBuilder)
  private confirmDialog = inject(ConfirmDialogService)
  private formArrayVersion = signal(0); // para forzar reevaluación
  private cdr = inject(ChangeDetectorRef); //forzar detección de cambios en el Dom
  private offersService = inject(OffersService)
  private router = inject(Router)
  private snackBarService = inject(SnackbarService)
  private allOffers = this.offersService.offersSignal
  private dateService = inject(DateConvertionService)
  readonly isEditMode = signal(false)
  private offerId: string | null = null;


  @Input()
  set id(id: string | null) {
    if (!id) return;
    this.offerId = id; // <- guardar el id
    console.log("id: ", id)
    console.log("Offer id: ", this.offerId)
    const offer = this.allOffers().find(o => o.id === id);
    if (!offer) return;

    this.isEditMode.set(true);
    const validDate = this.dateService.toValidDate(offer.date);
    this.offerForm.patchValue({ ...offer, date: new Date(validDate) });

    this.selectionStages.clear();
    offer.selectionStages.forEach(stage => {
      this.selectionStages.push(
        this.fb.group({
          name: this.fb.control(stage.name),
          completed: this.fb.control(stage.completed)
        })
      );
    });
    this.stagesSignal.set([...this.selectionStages.controls]);
  }

  offerForm = this.fb.group({
    title: new FormControl('', { validators: [Validators.required] }),
    company: new FormControl('', { validators: [Validators.required] }),
    location: new FormControl(''),
    offerUrl: new FormControl('', { validators: [Validators.required, Validators.pattern(/^https?:\/\//)] }),
    companyUrl: new FormControl('', { validators: [Validators.required, Validators.pattern(/^https?:\/\//)] }),
    date: new FormControl(new Date()),
    submitted: new FormControl(false),
    coverLetter: new FormControl(''),
    description: new FormControl(''),
    schedule: new FormControl<JobScheduleType>(JobScheduleModel.OPTIONS[0]),
    contractType: new FormControl<JobContractType>(JobContractTypeModel.OPTIONS[0]),
    salary: new FormControl(''),
    selectionStages: this.fb.array<FormGroup>([]),
    newStageName: new FormControl(''),
    personalObjective: new FormControl("")
  });

  readonly stagesSignal = signal<FormGroup[]>([]);
  readonly scheduleOptions = JobScheduleModel.OPTIONS;
  readonly contractTypeOptions = JobContractTypeModel.OPTIONS;

  readonly canAddStage = computed(() => {
    this.formArrayVersion(); // reactiva el computed
    const stages = this.selectionStages.controls;
    if (!stages.length) return true;
    const last = stages[stages.length - 1];
    return last.valid;
  });

  // GETTERS
  get title() { return this.offerForm.get('title'); }
  get company() { return this.offerForm.get('company'); }
  get location() { return this.offerForm.get('location'); }
  get offerUrl() { return this.offerForm.get('offerUrl'); }
  get companyUrl() { return this.offerForm.get('companyUrl'); }
  get date() { return this.offerForm.get('date'); }
  get submitted() { return this.offerForm.get('submitted'); }
  get coverLetter() { return this.offerForm.get('coverLetter'); }
  get description() { return this.offerForm.get('description'); }
  get schedule() { return this.offerForm.get('schedule'); }
  get contractType() { return this.offerForm.get('contractType'); }
  get salary() { return this.offerForm.get('salary'); }
  get selectionStages(): FormArray<FormGroup> {
    return this.offerForm.get('selectionStages') as FormArray<FormGroup>;
  }
  get newStageName() { return this.offerForm.get("newStageName") as FormControl }
  get personalObjective() { return this.offerForm.get("personalObjective") as FormControl }

  addStage() {
    const name = this.newStageName.value.trim();
    if (!name) return;

    const stage = this.fb.group({
      name: this.fb.control(name),
      completed: this.fb.control(false),
    });

    this.selectionStages.push(stage);
    this.newStageName.reset();
    this.stagesSignal.set([...this.selectionStages.controls]); // ← Actualiza la señal
  }

  removeStage(index: number) {
    this.confirmDialog.confirm('¿Seguro que deseas eliminar esta etapa?').subscribe((confirmed) => {
      if (confirmed) {
        this.selectionStages.removeAt(index);
        this.stagesSignal.set([...this.selectionStages.controls]); // ← Actualiza la señal
        this.cdr.markForCheck()
      }
    });
  }

  resetForm() {
    this.confirmDialog.confirm('¿Seguro de que quieres reiniciar el formulario? Esta acción va a borrar todos los campos', 'Borrando formulario').subscribe(
      (confirm) => {
        if (confirm) {
          this.stagesSignal.set([])
          this.offerForm.reset()
          this.cdr.markForCheck()
          this.offerForm.clearValidators()
        }
      }
    )
  }

  submit() {
    const { title, company, location, offerUrl, companyUrl, date,
      submitted, coverLetter, description, schedule, contractType,
      salary, personalObjective } = this.offerForm.value;

    if (!this.offerForm.valid || !title || !company || !offerUrl || !companyUrl) {
      this.snackBarService.show("Por favor, completa los campos obligatorios", "error");
      return;
    }
    const offer: Omit<JobOfferInterface, 'id'> = {
      title,
      company,
      location: location || '',
      offerUrl,
      companyUrl,
      date: date || new Date(),
      submitted: submitted ?? false,
      coverLetter: coverLetter || '',
      description: description || '',
      schedule: schedule as JobScheduleType,
      contractType: contractType as JobContractType,
      salary: salary || '',
      personalObjective: personalObjective || '',
      selectionStages: this.selectionStages.value
    };

    if (this.isEditMode()) {
      if (this.offerId) {
        this.offersService.editOffer(this.offerId, offer);
        this.snackBarService.show("Oferta actualizada con éxito", "success");
      } else {
        this.snackBarService.show("No se encontró el ID de la oferta", "error");
        return;
      }
    } else {
      this.offersService.addOffer(offer);
      this.snackBarService.show("Oferta guardada con éxito", "success");
    }
    this.router.navigate(["/offers"])
  }

  backToOffers() {
    this.offerForm.reset()
    this.router.navigate(["/offers"])
  }
}
