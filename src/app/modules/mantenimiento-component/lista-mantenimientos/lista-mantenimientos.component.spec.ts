import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMantenimientosComponent } from './lista-mantenimientos.component';

describe('ListaMantenimientosComponent', () => {
  let component: ListaMantenimientosComponent;
  let fixture: ComponentFixture<ListaMantenimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMantenimientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaMantenimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
