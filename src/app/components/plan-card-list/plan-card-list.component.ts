import { Component, OnInit, Input } from "@angular/core";
import { Plan } from "src/app/_interfaces/plan.interface";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { PlanService } from "src/app/services/plan.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-plan-card-list",
  templateUrl: "./plan-card-list.component.html",
  styleUrls: ["./plan-card-list.component.scss"]
})
export class PlanCardListComponent implements OnInit {
  @Input() plans$: Observable<Plan[]>;

  private plans: Plan[] = null;
  private votedPlans: Map<string, number> = new Map<string, number>();
  private userFetched: boolean = false;

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

  constructor(private auth: AuthService, private userService: UserService) {}

  ngOnInit() {
    if (this.plans$) {
      this.plans$.subscribe(data => {
        this.plans = data;
      });
    }
    this.auth.loggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.userService.getUserById(this.auth.user.sub).subscribe(user => {
          this.userFetched = true;
          Object.keys(user.votes).forEach(_id => {
            this.votedPlans.set(_id, user.votes[_id]);
          });
          if (this.plans != null) {
            this.plans.map<Plan>(this.mapPlan);
          }
        });
      }
    });
  }

  doRefresh(event) {
    this.plans$.subscribe(plans => {
      this.plans = plans.map<Plan>(this.mapPlan);
      event.target.complete();
    });
  }
}
