import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { SnackbarService } from '../../../../shared/services/snackbar-service';
import { provideRouter } from '@angular/router';

describe('Login', () => {
  let fixture: ComponentFixture<Login>;
  let component: Login;
  let snackbarSpy: jasmine.SpyObj<SnackbarService>;

  beforeEach(async () => {
    snackbarSpy = jasmine.createSpyObj('SnackbarService', ['show']);

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        { provide: SnackbarService, useValue: snackbarSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form as invalid and show snackbar if fields are empty', () => {
    component.submit();
    expect(component.loginForm.valid).toBeFalse();
    expect(snackbarSpy.show).toHaveBeenCalledWith('Formulario incorrecto', 'error');
  });

  it('should not call snackbar if form is valid', () => {
    component.email?.setValue('test@example.com');
    component.password?.setValue('123456');
    component.submit();
    expect(component.loginForm.valid).toBeTrue();
    expect(snackbarSpy.show).not.toHaveBeenCalled();
  });
});
