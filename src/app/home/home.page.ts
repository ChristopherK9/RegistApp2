import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  loginForm: FormGroup;
  username: string = '';
  email: string = '';
  password : string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

 onLogin() {
    if (this.loginForm.valid) {
      this.email = this.loginForm.value.email;
      this.password = this.loginForm.value.password;

      const loginData = { email: this.email, password: this.password };
      let endpoint = '';
      let isStudent = false;

      // Verificar si el usuario es un estudiante o un profesor
      if (this.email.includes('@estudiante.com')) {
        endpoint = 'students/login';
        isStudent = true;
      } else if (this.email.includes('@profesor.com')) {
        endpoint = 'teachers/login';
      }

      this.authService.login(endpoint, loginData).subscribe(
        (response) => {
    
          // Guardar datos del usuario en localStorage
          const user = isStudent ? response.student : response.teacher;
          user.isStudent = isStudent;

          localStorage.setItem('userData', JSON.stringify(user));

          // Redirigir al usuario
          this.router.navigate(['/bienvenido']);
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
        }
      );
      
      this.loginForm.reset();
    }
  }

  async showErrorAlert(error: any) {
    const alert = await this.alertController.create({
      header: 'Error en el inicio de sesión',
      message: error.message || 'Ocurrió un error inesperado. Intenta de nuevo.',
      buttons: ['OK']
    });

    await alert.present();
  }
}