import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Plan } from '../_interfaces/plan.interface';
import { API_URL } from '../config';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private url = API_URL;
  private httpOptions = {
    headers: null
  };
  private homePlans$: Observable<Plan[]> = new Observable;
  private homePlans: Plan[];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private toastCtrl: ToastController
    ) {
      this.homePlans$.subscribe( (data) => {
        this.homePlans = data;
      })
      this.refreshHeaders();

    }

  refreshHeaders() {
    this.httpOptions.headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${this.auth.accessToken}`
    });

  }
  public getHome(): Observable<Plan[]>{ 
    console.log(this.url);
    this.homePlans$ = this.http.get<Plan[]>(this.url)
      .pipe(
        tap(_ => this.log('Home fetched')),
        catchError(this.handleError<Plan[]>("getHome"))
      );
    return this.homePlans$;
  }

  public createPlan(plan: Plan){
    this.refreshHeaders();
    this.http.post(this.url, JSON.stringify(plan, null, 2), this.httpOptions)
      .pipe(
        tap(_ => this.toast("Plan Created")),
        catchError(this.handleError<Plan>('createPlan'))
      ).subscribe();
  }

  // Request specific plan to API by _id
  public getPlanById(_id: string) {
    return this.http.get<Plan>(this.url +'/'+ _id ).pipe(
      tap(_ => this.log('Plan fetched by Id')),
      catchError(this.handleError<Plan>('getPlanById'))
    );
  }

  // Load a previously fetched plan by _id
  public loadPlanById(_id: string) {
    if(this.homePlans == undefined)
      return null;
    let plan = this.homePlans.find(plan => plan._id === _id);
    return plan;
  }

  public deletePlanById(_id: string) {
    this.refreshHeaders();
    this.http.delete(this.url + '/' + _id, this.httpOptions).pipe(
      tap(_ => this.toast('Plan deleted')),
      catchError(this.handleError<Plan>('deletePlan'))
    ).subscribe();
  }

  public updatePlan(plan: Plan) {
    this.refreshHeaders();
    this.http.put(this.url + '/' + plan._id, plan, this.httpOptions).pipe(
      tap(_ => this.toast('Plan Updated')),
      catchError(this.handleError<Plan>('updatePlan'))
    ).subscribe();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.toast(operation + 'failed: ' + error.message);
      return of(result as T);
    }

  }

  async toast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  log(message) {
    console.log(message);
  }




  
}
