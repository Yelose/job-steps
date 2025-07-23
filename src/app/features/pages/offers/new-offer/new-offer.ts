import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { ConfirmDialogService } from '../../../../shared/services/confirm-dialog-service';


@Component({
  selector: 'app-new-offer',
  imports: [MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule,
    ReactiveFormsModule, MatDatepickerModule, MatCheckboxModule, MatSlideToggleModule, RouterLink],
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
    schedule: new FormControl(''),
    contractType: new FormControl(''),
    salary: new FormControl(''),
    selectionStages: this.fb.array<FormGroup>([]),
    newStageName: new FormControl('', Validators.required),
    personalObjective: new FormControl("")
  });

  readonly stagesSignal = signal<FormGroup[]>([]);



  readonly canAddStage = computed(() => {
    this.formArrayVersion(); // reactiva el computed
    const stages = this.selectionStages.controls;
    if (!stages.length) return true;
    const last = stages[stages.length - 1];
    return last.valid;
  });

  get title() {
    return this.offerForm.get('title');
  }

  get company() {
    return this.offerForm.get('company');
  }

  get location() {
    return this.offerForm.get('location');
  }

  get offerUrl() {
    return this.offerForm.get('offerUrl');
  }
  get companyUrl() {
    return this.offerForm.get('companyUrl');
  }

  get date() {
    return this.offerForm.get('date');
  }

  get submitted() {
    return this.offerForm.get('submitted');
  }

  get coverLetter() {
    return this.offerForm.get('coverLetter');
  }
  get description() {
    return this.offerForm.get('description');
  }
  get schedule() {
    return this.offerForm.get('schedule');
  }
  get contractType() {
    return this.offerForm.get('contractType');
  }
  get salary() {
    return this.offerForm.get('salary');
  }
  get selectionStages(): FormArray<FormGroup> {
    return this.offerForm.get('selectionStages') as FormArray<FormGroup>;
  }

  get newStageName() {
    return this.offerForm.get("newStageName") as FormControl
  }

  get personalObjective() {
    return this.offerForm.get("personalObjective") as FormControl
  }


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
    console.log(this.offerForm.value);
  }

}
