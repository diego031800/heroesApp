import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(
    private auth_s: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      // if (this.auth_s.auth.id) {
      //   return true;
      // }
      // return false;
      return this.auth_s.verificarAutentificacion()
              .pipe(
                tap( estaAutenticado => {
                  if (!estaAutenticado) {
                    this.router.navigate(['./auth/login'])
                  }
                })
              );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
    //   if (this.auth_s.auth.id) {
    //     return true;
    //   }
    // return false;

      return this.auth_s.verificarAutentificacion().pipe(
                tap((estaAutenticado) => {
                  if (!estaAutenticado) {
                    this.router.navigate(['./auth/login']);
                  }
                })
              );
  }
}
