import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainToolbar } from './main-toolbar';
import { provideRouter } from '@angular/router';
import { DrawerService } from '../../../core/services/drawer-service';

describe('MainToolbar', () => {
  let component: MainToolbar;
  let fixture: ComponentFixture<MainToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainToolbar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MainToolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call drawerService.toggle() when toggleDrawer is called', () => {
    const drawerService = TestBed.inject(DrawerService);
    spyOn(drawerService, 'toggle'); // espía el método real

    component.toggleDrawer();

    expect(drawerService.toggle).toHaveBeenCalled(); // verifica ejecución
  });


  it('should call toggleDrawer() when menu button is clicked', () => {
    spyOn(component, 'toggleDrawer');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(component.toggleDrawer).toHaveBeenCalled();
  });
});
