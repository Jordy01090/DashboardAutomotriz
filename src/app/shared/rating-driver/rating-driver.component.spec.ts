import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingDriverComponent } from './rating-driver.component';

describe('RatingDriverComponent', () => {
  let component: RatingDriverComponent;
  let fixture: ComponentFixture<RatingDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
