import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRegistrosMantenimientoDialogComponent } from './no-registros-mantenimiento-dialog.component';

describe('NoRegistrosMantenimientoDialogComponent', () => {
  let component: NoRegistrosMantenimientoDialogComponent;
  let fixture: ComponentFixture<NoRegistrosMantenimientoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoRegistrosMantenimientoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoRegistrosMantenimientoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
