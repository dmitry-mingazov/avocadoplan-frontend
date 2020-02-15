import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Plan } from "../_interfaces/plan.interface";
import {
  API_BASE,
  API_DOWNVOTE,
  API_PLANS,
  API_UPVOTE,
  API_UNVOTE,
  API_OWNED_BY,
  API_SAVED
} from "../config";
import { AuthService } from "./auth.service";
import { JsonPipe } from "@angular/common";
import { ToastController } from "@ionic/angular";
import { HttpHelperService } from "./http-helper.service";

@Injectable({
  providedIn: "root"
})
export class PlanService {
  private baseUrl = API_BASE + API_PLANS;
  private upvote = API_UPVOTE;
  private downvote = API_DOWNVOTE;
  private unvote = API_UNVOTE;
  private ownedBy = API_OWNED_BY;
  private saved = API_SAVED;
  private httpOptions = {
    headers: null
  };
  private homePlans$: Observable<Plan[]> = new Observable();
  private homePlans: Plan[];

  private userPlans$: Observable<Plan[]> = new Observable();

  private savedPlans$: Observable<Plan[]> = new Observable();

  constructor(private http: HttpClient, private helper: HttpHelperService) {
    this.homePlans$.subscribe(data => {
      this.homePlans = data;
    });
  }

  public getHome(): Observable<Plan[]> {
    console.log(this.baseUrl);
    this.homePlans$ = this.http.get<Plan[]>(this.baseUrl).pipe(
      tap(_ => this.helper.log("Home fetched")),
      catchError(this.helper.handleError<Plan[]>("getHome"))
    );
    return this.homePlans$;
  }

  public getUserPlans(_id: string): Observable<Plan[]> {
    console.log(this.baseUrl);
    this.userPlans$ = this.http
      .get<Plan[]>(`${this.baseUrl}${this.ownedBy}/${_id}`)
      .pipe(
        tap(_ => this.helper.log("User plans fetched")),
        catchError(this.helper.handleError<Plan[]>("getUserPlans"))
      );
    return this.userPlans$;
  }

  public getSavedPlans(_id: string): Observable<Plan[]> {
    console.log(this.baseUrl);
    this.savedPlans$ = this.http
      .get<Plan[]>(`${this.baseUrl}${this.saved}`, this.helper.getAuthOptions())
      .pipe(
        tap(_ => this.helper.log("Saved plans fetched")),
        catchError(this.helper.handleError<Plan[]>("getSavedPlans"))
      );
    return this.savedPlans$;
  }

  public createPlan(plan: Plan) {
    this.http
      .post(this.baseUrl, plan, this.helper.getAuthOptions())
      .pipe(
        tap(_ => this.helper.showToast("Plan Created")),
        catchError(this.helper.handleError<Plan>("createPlan"))
      )
      .subscribe();
  }

  // Request specific plan to API by _id
  public getPlanById(_id: string) {
    return this.http.get<Plan>(`${this.baseUrl}/${_id}`).pipe(
      tap(_ => this.helper.log("Plan fetched by Id")),
      catchError(this.helper.handleError<Plan>("getPlanById"))
    );
  }

  // Load a previously fetched plan by _id
  public loadPlanById(_id: string) {
    if (this.homePlans == undefined) return null;
    let plan = this.homePlans.find(plan => plan._id === _id);
    return plan;
  }

  public deletePlanById(_id: string) {
    this.http
      .delete(`${this.baseUrl}/${_id}`, this.helper.getAuthOptions())
      .pipe(
        tap(_ => this.helper.showToast("Plan deleted")),
        catchError(this.helper.handleError<Plan>("deletePlan"))
      )
      .subscribe();
  }

  public updatePlan(plan: Plan) {
    this.http
      .put(`${this.baseUrl}/${plan._id}`, plan, this.helper.getAuthOptions())
      .pipe(
        tap(_ => this.helper.showToast("Plan Updated")),
        catchError(this.helper.handleError<Plan>("updatePlan"))
      )
      .subscribe();
  }

  public upvotePlan(_id: string) {
    this.http
      .put(
        `${this.baseUrl}${this.upvote}/${_id}`,
        null,
        this.helper.getAuthOptions()
      )
      .pipe(
        tap(_ => this.helper.showToast("Plan Upvoted")),
        catchError(this.helper.handleError<Plan>("upvotePlan"))
      )
      .subscribe();
  }

  public downvotePlan(_id: string) {
    this.http
      .put(
        `${this.baseUrl}${this.downvote}/${_id}`,
        null,
        this.helper.getAuthOptions()
      )
      .pipe(
        tap(_ => this.helper.showToast("Plan Downvoted")),
        catchError(this.helper.handleError<Plan>("upvotePlan"))
      )
      .subscribe();
  }

  public unvotePlan(_id: string) {
    this.http
      .put(
        `${this.baseUrl}${this.unvote}/${_id}`,
        null,
        this.helper.getAuthOptions()
      )
      .pipe(
        tap(_ => this.helper.showToast("Plan Unvoted")),
        catchError(this.helper.handleError<Plan>("unvotePlan"))
      )
      .subscribe();
  }
}
