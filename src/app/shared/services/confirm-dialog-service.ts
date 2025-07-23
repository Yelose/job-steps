import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog-component/confirm-dialog-component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  private dialog = inject(MatDialog)

  confirm(message: string, title?: string) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title, message },
    });

    return ref.afterClosed(); // devuelve Observable<boolean>
  }
}
