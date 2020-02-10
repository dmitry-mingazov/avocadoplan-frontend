import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastCtrl: ToastController
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if(this.isLogged())
      return true;
    else{
      this.showToast();
      this.router.navigate(['app/tabs/user']);
      return false;
    }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if(this.isLogged())
      return true;
    else{
      this.showToast();
      this.router.navigate(['app/tabs/user']);
      return false;
    }
  }

  private isLogged() {
    return this.auth.loggedIn;
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: 'Login required',
      duration: 2000
    });
    toast.present();
  }
}
