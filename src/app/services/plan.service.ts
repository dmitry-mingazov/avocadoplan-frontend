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

  constructor(
    private http: HttpClient,
    private auth: AuthService) {}

  public getHome(): Observable<any>{ 
    console.log(this.url);
    return this.http.get<Plan[]>(this.url);
  }

  public createPlan(plan: Plan){
    let headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${this.auth.accessToken}`
    })
    this.http.post(this.url, JSON.stringify(plan, null, 2), {headers: headers}).subscribe( (response) => {
      console.log(response);
    });
  }

  
}
