import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { PlanService } from "src/app/services/plan.service";
import { Plan } from "src/app/_interfaces/plan.interface";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.page.html",
  styleUrls: ["./user.page.scss"]
})
export class UserPage implements OnInit {
  private votedPlans: Map<string, number> = new Map<string, number>();
  private userFetched: boolean = false;
  private userPlans: Plan[] = null;
  private loading: boolean = true;

  constructor(
    private userService: UserService,
    private planService: PlanService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.loggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.userService.getUserById(this.auth.user.sub).subscribe(user => {
          this.userFetched = true;
          Object.keys(user.votes).forEach(_id => {
            this.votedPlans.set(_id, user.votes[_id]);
          });
          if (this.userPlans != null) {
            this.userPlans.map<Plan>(this.mapPlan);
          }
        });
        this.getUserPlans(this.auth.user.sub);
      }
    });
  }

  getUserPlans(_id: string) {
    this.planService.getUserPlans(_id).subscribe(plans => {
      this.userPlans = plans.map<Plan>(this.mapPlan);
      this.loading = false;
    });
  }

  private mapPlan = plan => {
    if (this.userFetched) {
      let vote = this.votedPlans.get(plan._id);
      plan.upvoted = vote ? vote > 0 : undefined;
      plan.downvoted = vote ? vote < 0 : undefined;
    } else {
      plan.upvoted = false;
      plan.downvoted = false;
    }
    return plan;
  };
}
