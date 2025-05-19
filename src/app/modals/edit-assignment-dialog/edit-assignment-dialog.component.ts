import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { Assigment } from '@app/modules/drivers-component/interfaces/assigment';
@Component({
  selector: 'app-edit-assignment-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './edit-assignment-dialog.component.html',
  styleUrl: './edit-assignment-dialog.component.css'
})
export class EditAssignmentDialogComponent {
  public form:FormGroup;
  constructor(
    public dialogRef:MatDialogRef<EditAssignmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Assigment,
    private fb:FormBuilder
  ){
    
    this.form = this.fb.group({
      id:[data.id],
      conductor:[data.conductor,Validators.required],
      vehiculo:[data.vehiculo,Validators.required],
      fechaInicio:[data.fechaInicio,Validators.required],
      fechaFin:[data.fechaFin],
      estado:[data.estado,Validators.required]
    })

  }
  onNoClick():void{
    this.dialogRef.close();

  }
  guardar():void{
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }

}
