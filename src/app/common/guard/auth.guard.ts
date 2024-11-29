import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyecta el servicio de autenticación
  const router = inject(Router); // Inyecta el router

  const user = localStorage.getItem('userData');
  if (user) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

