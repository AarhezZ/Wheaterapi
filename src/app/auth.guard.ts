import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from './services/firestore.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private fireService: FirestoreService, private routes: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.fireService.paciente$.pipe(
      take(1),
      map(paciente => {
        console.log(paciente);

        if (paciente) {
          return true;
        } else {
          // redirecToLogin
          this.routes.navigate(['/login'])
          return false;
        }
      })
    );
  }

}
