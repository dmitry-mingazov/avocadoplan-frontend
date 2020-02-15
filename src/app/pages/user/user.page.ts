import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { PlanService } from "src/app/services/plan.service";
import { Plan } from "src/app/_interfaces/plan.interface";
import { UserService } from "src/app/services/user.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.page.html",
  styleUrls: ["./user.page.scss"]
})
export class UserPage implements OnInit {
  private userPlans$: Observable<Plan[]> = null;

  constructor(private planService: PlanService, private auth: AuthService) {}

  ngOnInit() {
    this.auth.loggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.userPlans$ = this.planService.getUserPlans(this.auth.user.sub);
      }
    });
  }
}
