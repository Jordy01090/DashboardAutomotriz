import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVehiculoDialogComponent } from './editar-vehiculo-dialog.component';

describe('EditarVehiculoDialogComponent', () => {
  let component: EditarVehiculoDialogComponent;
  let fixture: ComponentFixture<EditarVehiculoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarVehiculoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarVehiculoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
