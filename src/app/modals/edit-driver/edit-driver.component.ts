import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
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
import { Driver } from '@app/modules/drivers-component/interfaces/driver';

@Component({
  selector: 'app-edit-driver',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './edit-driver.component.html',
  styleUrl: './edit-driver.component.css',
})
export class EditDriverComponent {
  public form:FormGroup;
  constructor(
    public dialogRef:MatDialogRef<EditDriverComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Driver,
    private fb:FormBuilder
  ){
    let expiredDate = new Date(data.license.expDate);
    this.form = this.fb.group({
      id: [data.id],
      name: [data.name, Validators.required],
      license: [data.license.type, Validators.required],
      expDate: [data.license.expDate, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      rating: [
        data.rating,
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      status: [data.status, Validators.required],
    });

  }

  onNoCLick():void{
    this.dialogRef.close();
  }
  guardar():void{
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }
}
