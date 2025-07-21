import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar-service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>


  beforeEach(() => {
    const spy = jasmine.createSpyObj("MatSnackBar", ["open"])

    TestBed.configureTestingModule({
      providers: [
        SnackbarService,
        { provide: MatSnackBar, useValue: spy }
      ]
    });
    service = TestBed.inject(SnackbarService);
    matSnackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call open() with default type info', () => {
    service.show('Mensaje de prueba');
    expect(matSnackBarSpy.open).toHaveBeenCalledWith(
      'Mensaje de prueba',
      'Cerrar',
      jasmine.objectContaining({
        duration: 3000,
        panelClass: ['snackbar-info'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      })
    );
  });

  it('should call open() with custom type success', () => {
    service.show('Éxito', 'success');
    expect(matSnackBarSpy.open).toHaveBeenCalledWith(
      'Éxito',
      'Cerrar',
      jasmine.objectContaining({
        panelClass: ['snackbar-success'],
      })
    );
  });

  it('should call open() with custom duration and type error', () => {
    service.show('Error crítico', 'error', 5000);
    expect(matSnackBarSpy.open).toHaveBeenCalledWith(
      'Error crítico',
      'Cerrar',
      jasmine.objectContaining({
        duration: 5000,
        panelClass: ['snackbar-error'],
      })
    );
  });


});
