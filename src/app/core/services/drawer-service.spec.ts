import { DrawerService } from './drawer-service';

describe('DrawerService', () => {
  let service: DrawerService;

  beforeEach(() => {
    service = new DrawerService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle the drawer state', () => {
    expect(service.isDrawerOpen()).toBeFalse();
    service.toggle();
    expect(service.isDrawerOpen()).toBeTrue();
    service.toggle();
    expect(service.isDrawerOpen()).toBeFalse();
  });

  it('should open the drawer', () => {
    service.open();
    expect(service.isDrawerOpen()).toBeTrue();
  });

  it('should close the drawer', () => {
    service.open();
    service.close();
    expect(service.isDrawerOpen()).toBeFalse();
  });
});
