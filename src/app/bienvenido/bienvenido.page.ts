import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ClassService } from '../service/classes.service';
@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.page.html',
  styleUrls: ['./bienvenido.page.scss'],
})
export class BienvenidoPage implements OnInit {
public user: any;
  photos: any[] = [];
  public classes: any;
  qrCodeUrl: string = ''; // Guardar la URL del QR
  selectedClass: any = null; // Guardar la clase seleccionada
  isModalOpen: boolean = false; // Estado para controlar el modal
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private classService: ClassService,
) { }

  ngOnInit() {
    this.getUserData();
    this.getClasses();
  }
  getUserData(): void {
    const userData = this.authService.getUserData();
    this.user = userData;
    console.log(this.user);
  }
  generateQR(classId: string): void {
    const data = {
      class_id: classId,
    };
    this.classService.generateQRCode(data).subscribe((response) => {
      this.qrCodeUrl = response.url; // Obtén la URL del QR desde la respuesta
      this.selectedClass = this.classes.find((cls: any) => cls.id === classId); // Guarda la clase seleccionada
      this.isModalOpen = true; // Abre el modal
    });
  }

  closeModal(): void {
    this.isModalOpen = false; // Cierra el modal
    this.qrCodeUrl = ''; // Limpia la URL al cerrar
  }

  getClasses(): void {
    this.classService.getClasses('classes').subscribe((data) => {
      const classes = data.classes;
      console.log(classes);
      const filteredClasses = classes.filter(
        (c: any) => c.teacher_id === this.user.id
      );
      this.classes = filteredClasses;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  goRoute() {
    this.router.navigate(['/apirestt']);
  }

}
