import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosComponentComponent } from './vehiculos-component.component';

describe('VehiculosComponentComponent', () => {
  let component: VehiculosComponentComponent;
  let fixture: ComponentFixture<VehiculosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculosComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
