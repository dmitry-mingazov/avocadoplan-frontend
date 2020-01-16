import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from '../_interfaces/plan.interface';
import { API_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  url = API_URL;

  constructor(private http: HttpClient) {}

  public getHome(): Observable<any>{ 
    return this.http.get(this.url);
  }

  public createPlan(plan: Plan){
    this.http.post(this.url, plan);
  }

  
}
