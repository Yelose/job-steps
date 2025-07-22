import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { computed, signal, effect } from '@angular/core';


@Component({
  selector: 'app-new-offer',
  imports: [MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule,
    ReactiveFormsModule, MatDatepickerModule, MatCheckboxModule, MatSlideToggleModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-offer.html',
  styleUrl: './new-offer.scss'
})
export class NewOffer {
  fb = inject(NonNullableFormBuilder)
  private formArrayVersion = signal(0); // para forzar reevaluación

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
    newStageName: new FormControl('', Validators.required)
  });

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
  addStage() {
    const name = this.newStageName.value.trim();
    if (!name) return;

    const stage = this.fb.group({
      name: this.fb.control(name),
      completed: this.fb.control(false),
    });

    this.selectionStages.push(stage);
    this.newStageName.reset(); // limpia input tras añadir
  }
  removeStage(index: number) {
    this.selectionStages.removeAt(index);
    this.formArrayVersion.update((v) => v + 1);
  }

  submit() {
    console.log(this.offerForm.value);
  }

}
