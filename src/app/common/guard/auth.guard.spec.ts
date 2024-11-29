import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Update the path to the correct location of AuthGuard
import { AuthService } from '../service/auth.service'; // Update the path to the correct location of AuthService
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    // Configuración de TestBed
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Importar RouterTestingModule para pruebas de navegación
      providers: [
        AuthGuard,
        {
          provide: AuthService, // Simular el servicio de autenticación
          useValue: {
            isAuthenticated: () => of(true), // Simula el servicio de autenticación
          },
        },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy(); // Verificar que el guard se haya creado correctamente
  });

  it('should allow activation if authenticated', () => {
    // Simula que el usuario está autenticado
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    const result = authGuard.canActivate();
    expect(result).toBe(true); // Verifica que se permita el acceso
  });

  it('should not allow activation if not authenticated', () => {
    // Simula que el usuario no está autenticado
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    const navigateSpy = spyOn(router, 'navigate'); // Espiar el método navigate del router
    const result = authGuard.canActivate();
    expect(result).toBe(false); // Verifica que no se permita el acceso
    expect(navigateSpy).toHaveBeenCalledWith(['/login']); // Verifica que la redirección se haya llamado correctamente
  });
});
