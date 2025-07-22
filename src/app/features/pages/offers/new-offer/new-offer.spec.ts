import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOffer } from './new-offer';

describe('NewOffer', () => {
  let component: NewOffer;
  let fixture: ComponentFixture<NewOffer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOffer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOffer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
