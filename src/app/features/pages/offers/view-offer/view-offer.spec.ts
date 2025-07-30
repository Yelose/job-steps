import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOffer } from './view-offer';

describe('ViewOffer', () => {
  let component: ViewOffer;
  let fixture: ComponentFixture<ViewOffer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOffer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOffer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
