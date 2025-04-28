import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversComponentComponent } from './drivers-component.component';

describe('DriversComponentComponent', () => {
  let component: DriversComponentComponent;
  let fixture: ComponentFixture<DriversComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
