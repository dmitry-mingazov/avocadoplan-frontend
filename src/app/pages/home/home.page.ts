import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { PlanService } from "src/app/services/plan.service";
import { Plan } from "src/app/_interfaces/plan.interface";
import { PlanPageModule } from "../plan/plan.module";
import { NavController } from "@ionic/angular";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/_interfaces/user.interface";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  UPVOTE = true;
  DOWNVOTE = false;
  private plans: Plan[] = null;
  private loading: boolean = true;

  private votedPlans: Map<string, number> = new Map<string, number>();
  private userFetched: boolean = false;

  constructor(
    private planService: PlanService,
    private auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.auth.loggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.userService.getUserById(this.auth.user.sub).subscribe(user => {
          console.log("here");
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
    this.getHome();
  }

  getHome() {
    this.planService.getHome().subscribe(plans => {
      this.plans = plans.map<Plan>(this.mapPlan);
      this.loading = false;
    });
  }

  doRefresh(event) {
    this.planService.getHome().subscribe(plans => {
      this.plans = plans.map<Plan>(this.mapPlan);
      event.target.complete();
    });
  }

  private mapPlan = plan => {
    if (this.userFetched) {
      let vote = this.votedPlans.get(plan._id);
      plan.upvoted = vote ? false : vote > 0;
      plan.downvoted = vote ? false : vote < 0;
    } else {
      plan.upvoted = false;
      plan.downvoted = false;
    }
    return plan;
  };
}
