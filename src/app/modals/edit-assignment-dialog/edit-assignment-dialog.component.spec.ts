import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssignmentDialogComponent } from './edit-assignment-dialog.component';

describe('EditAssignmentDialogComponent', () => {
  let component: EditAssignmentDialogComponent;
  let fixture: ComponentFixture<EditAssignmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAssignmentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAssignmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
