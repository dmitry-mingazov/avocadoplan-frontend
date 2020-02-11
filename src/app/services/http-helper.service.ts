import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor(
    private toastCtrl: ToastController,
    private auth: AuthService

  ) { }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.showToast(operation + 'failed: ' + error.message);
      return of(result as T);
    }

  }

  async showToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();

  }

  public log(message) {
    console.log(message);
  }

  getAuthOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth.accessToken}`
      })
    }
  }
}
