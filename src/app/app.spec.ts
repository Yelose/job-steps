import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { DrawerService } from './core/services/drawer-service';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('App', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]), // ✅ Añadir esto para que funcione RouterOutlet, RouterLink, ActivatedRoute
        {
          provide: DrawerService,
          useValue: {
            isDrawerOpen: signal(true),
            close: jasmine.createSpy('close'),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should return signal value from drawerOpen', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.drawerOpen()).toBeTrue();
  });

  it('should call drawerService.close() when closeDrawer is triggered', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const drawerService = TestBed.inject(DrawerService);
    app.closeDrawer();
    expect(drawerService.close).toHaveBeenCalled();
  });
});
