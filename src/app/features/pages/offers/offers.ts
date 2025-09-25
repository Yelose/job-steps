import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OffersService } from '../../../core/services/offers-service';
import { RouterLink } from '@angular/router';
import { ConfirmDialogService } from '../../../shared/services/confirm-dialog-service';
import { SnackbarService } from '../../../shared/services/snackbar-service';
import { DateConvertionService } from '../../../shared/utils/date-convertion-service';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipModule,
} from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { myCustomTooltipDefaults } from '../../../shared/utils/tooltip-defualt-options';


@Component({
  selector: 'app-offers',
  providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }],
  imports: [CommonModule, RouterLink, MatTableModule, MatPaginatorModule, MatIconModule,
    MatButtonModule, MatTooltipModule, MatMenuModule],
  templateUrl: './offers.html',
  styleUrl: './offers.scss'
})

export class Offers {
  private confirmDialog = inject(ConfirmDialogService)
  private snackBar = inject(SnackbarService)
  private offersService = inject(OffersService)
  private toDate = inject(DateConvertionService)

  offers = this.offersService.offersSignal

  readonly displayedColumns = ['title', 'company', 'actions'];

  formatDate(date: Date | string) {
    return this.toDate.toShortDate(date)
  }
  delete(id: string) {
    this.confirmDialog.confirm("¿Seguro que quieres eliminar esta oferta", "Eliminando oferta").subscribe((confirmed) => {
      if (confirmed) {
        this.offersService.deleteOffer(id)
        this.snackBar.show("Has eliminado la oferta correctamente", "success")
      } else {
        this.snackBar.show("No has eliminado la oferta", "info")
      }
    })
  }

  addColumn() { }

  removeColumn() { }

}
