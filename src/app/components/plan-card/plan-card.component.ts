import { Component, OnInit, Input } from "@angular/core";
import { Plan } from "src/app/_interfaces/plan.interface";
import { AuthService } from "src/app/services/auth.service";
import { NavController } from "@ionic/angular";
import { PlanService } from "src/app/services/plan.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-plan-card",
  templateUrl: "./plan-card.component.html",
  styleUrls: ["./plan-card.component.scss"]
})
export class PlanCardComponent implements OnInit {
  @Input() plan: Plan = null;
  @Input() votedPlans: Map<string, number> = new Map<string, number>();

  UPVOTE = true;
  DOWNVOTE = false;

  constructor(
    private planService: PlanService,
    private navCtrl: NavController,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  openPlan(plan: Plan) {
    this.navCtrl.navigateForward(`plan/${plan._id}`);
  }

  votePlan(plan: Plan, vote: boolean) {
    if (!this.auth.loggedIn) {
      // TODO: create middleware service to communicate the 401
    } else {
      // if vote is equals to one vote already given to the plan
      if ((vote && plan.upvoted) || (!vote && plan.downvoted)) {
        this.planService.unvotePlan(plan._id);
        this.modifyLocalVotes(plan);
        // else if vote is upvote
      } else {
        if (vote) {
          this.planService.upvotePlan(plan._id);
          // else vote is downvote
        } else {
          this.planService.downvotePlan(plan._id);
        }
        this.modifyLocalVotes(plan, vote);
      }
    }
  }

  modifyLocalVotes(plan: Plan, newVote?: boolean) {
    if (newVote === undefined) {
      plan.votes += plan.upvoted ? -1 : 1;
      plan.upvoted = false;
      plan.downvoted = false;
    } else {
      if (plan.upvoted == plan.downvoted) plan.votes += newVote ? 1 : -1;
      else plan.votes += newVote ? 2 : -2;
      plan.upvoted = newVote;
      plan.downvoted = !newVote;
      this.votedPlans.set(plan._id, newVote ? 1 : -1);
    }
  }
}
