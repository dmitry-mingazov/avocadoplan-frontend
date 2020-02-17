import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { PlanService } from "src/app/services/plan.service";
import { Plan } from "src/app/_interfaces/plan.interface";
import { PlanPageModule } from "../plan/plan.module";
import { NavController } from "@ionic/angular";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/_interfaces/user.interface";
import { Observable, BehaviorSubject } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  private planSub: BehaviorSubject<Plan[]> = new BehaviorSubject(null);
  private plans$: Observable<Plan[]> = this.planSub.asObservable();

  constructor(private planService: PlanService) {}

  ngOnInit() {
    this.getHome();
  }

  refreshHome(event) {
    this.planService.getHome().subscribe(plan => {
      this.planSub.next(plan);
      event.target.complete();
    });
  }

  getHome() {
    this.planService.getHome().subscribe(plan => {
      this.planSub.next(plan);
    });
  }
}
