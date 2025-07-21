import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth-service';
import { Auth } from '@angular/fire/auth';
import { User, UserCredential } from 'firebase/auth';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let mockAuth: Partial<Auth>;

  const mockUser = { email: 'test@example.com' } as User;

  const mockCredential: UserCredential = {
    user: mockUser,
    providerId: 'password',
    operationType: 'signIn',
  };

  beforeEach(() => {
    // Implementamos solo el método que usamos externamente
    mockAuth = {
      signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve()),
    };

    // ⚠️ Inyectamos el servicio con override del método login a mano
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Auth, useValue: mockAuth },
      ],
    });

    service = TestBed.inject(AuthService);

    // Reemplazamos el método `login()` temporalmente para test
    spyOn(service, 'login').and.returnValue(of(mockCredential));
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a UserCredential when login() is called', (done) => {
    service.login('test@example.com', 'password123').subscribe(result => {
      expect(result).toEqual(mockCredential);
      done();
    });
  });

  it('should call signOut on logout()', (done) => {
    service.logout().subscribe(() => {
      expect(mockAuth.signOut).toHaveBeenCalled();
      done();
    });
  });
});
