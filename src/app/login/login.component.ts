  import { Component } from '@angular/core';
  import { ReactiveFormsModule } from '@angular/forms';
  import { MatInputModule } from '@angular/material/input';
  import { MatButtonModule } from '@angular/material/button';
  import { MatIconModule } from '@angular/material/icon';
  import { MatCardModule } from '@angular/material/card';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { AutorizacionService } from '../services/autorizacion.service';
  import {Router} from '@angular/router'; //redirige desde el login



  @Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule,

      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatCardModule],
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent {
    loginForm: FormGroup;

    // Inyectamos el servicio 
    constructor(private fb: FormBuilder, 
      private auth:AutorizacionService, 
      private router:Router) {

      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }

    onSubmit() {
      alert('Se procederá a validar las credenciales de Acceso')

    //Constantes 

    const { email, password } = this.loginForm.value;
    if ( this.auth.login(email, password) ) {
      alert('Acceso concedido');
      this.router.navigate(['/principal']);
    } else {
      alert('Usuario o clave incorrectos');
    }


  }
  
  }

