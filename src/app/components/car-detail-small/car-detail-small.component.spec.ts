import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailSmallComponent } from './car-detail-small.component';

describe('CarDetailSmallComponent', () => {
  let component: CarDetailSmallComponent;
  let fixture: ComponentFixture<CarDetailSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDetailSmallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDetailSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
