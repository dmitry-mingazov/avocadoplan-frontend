import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from '../_interfaces/plan.interface';
import { API_URL } from '../config';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private url = API_URL;
  private headers = new HttpHeaders({
    'Content-type': 'application/json; charset=utf-8',
    'Authorization': `Bearer ${this.auth.accessToken}`
  })

  private homePlans$: Observable<Plan[]> = new Observable;
  private homePlans: Plan[];

  constructor(
    private http: HttpClient,
    private auth: AuthService) {
      this.homePlans$.subscribe( (data) => {
        this.homePlans = data;
      })
    }

  public getHome(): Observable<Plan[]>{ 
    console.log(this.url);
    this.homePlans$ = this.http.get<Plan[]>(this.url);
    return this.homePlans$;
  }

  public createPlan(plan: Plan){
    this.http.post(this.url, JSON.stringify(plan, null, 2), {headers: this.headers}).subscribe( (response) => {
      console.log(response);
    });
  }

  // Request specific plan to API by _id
  public getPlanById(_id: string) {
    return this.http.get<Plan>(this.url +'/'+ _id );
  }

  // Load a previously fetched plan by _id
  public loadPlanById(_id: string) {
    if(this.homePlans == undefined)
      return null;
    console.log("LAZY LOADED");
    let plan = this.homePlans.find(plan => plan._id === _id);
    return plan;
  }




  
}
