import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog-component',
  imports: [MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>{{ data.title || '¿Estás seguro?' }}</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions align="center">
      <button matButton="filled" class="cancel" mat-dialog-close [mat-dialog-close]="false">Cancelar</button>
      <button matButton="filled" [mat-dialog-close]="true">Continuar</button>
    </mat-dialog-actions>
  `,
  styleUrl: './confirm-dialog-component.scss'
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title?: string; message: string }
  ) { }
}
