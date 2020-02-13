import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PlanService } from 'src/app/services/plan.service';
import { Plan } from 'src/app/_interfaces/plan.interface';
import { PlanPageModule } from '../plan/plan.module';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/_interfaces/user.interface';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  UPVOTE = true;
  DOWNVOTE = false;
  private plans: Plan[] = null;
  private loading: boolean = true;

  private votedPlans: Map<string, number> = new Map<string, number>();
  private userFetched: boolean = false;


  private mapPlan = (plan) => {
    if(this.userFetched) {
      let vote = this.votedPlans.get(plan._id);
      if(vote == undefined) {
        plan.upvoted = false;
        plan.downvoted = false;
      } else {
        plan.upvoted = vote > 0;
        plan.downvoted = vote < 0;
      }
    } else {
      plan.upvoted = false;
      plan.downvoted = false;
    }
    return plan;
  }

  constructor(
    private planService: PlanService,
    private navCtrl: NavController,
    private auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // MUST SYNCHRONIZE
   
    this.auth.loggedIn$.subscribe( (loggedIn) => {
      if(loggedIn) {
        this.userService.getUserById(this.auth.user.sub).subscribe( (user) => {
          this.userFetched = true;
          Object.keys(user.votes).forEach( (_id) => {
            this.votedPlans.set(_id, user.votes[_id]);
          })
          if(this.plans != null) {
            this.plans.map<Plan>(this.mapPlan);
          }
        })
        } 

      }
    )
    this.getHome();
  }

  getHome() {
    this.planService.getHome().subscribe( (plans) => {
      this.plans = plans.map<Plan>(this.mapPlan);
      this.loading = false;
    })
  }

  doRefresh(event) {
    this.planService.getHome().subscribe((plans) => {
      this.plans = plans.map<Plan>(this.mapPlan);
      event.target.complete();
    })

  }

  openPlan(plan: Plan) {
    this.navCtrl.navigateForward(`plan/${plan._id}`);
  }

  votePlan(plan: Plan, vote: boolean) {
    if(!this.auth.loggedIn){
      // TODO: create middleware service to communicate the 401
    } else {
      // if vote is equals to one vote already given to the plan
      if(vote && plan.upvoted || !vote && plan.downvoted){
        this.planService.unvotePlan(plan._id);
        this.modifyLocalVotes(plan);
      // else if vote is upvote
      } else {
        if(vote) {
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
    
    if(newVote === undefined) {
      plan.votes += plan.upvoted ? -1 : 1;
      plan.upvoted = false;
      plan.downvoted = false;
    } else {
      if(plan.upvoted == plan.downvoted)
        plan.votes += newVote ? 1 : -1;
      else
        plan.votes += newVote ? 2 : -2;
      plan.upvoted = newVote;
      plan.downvoted = !newVote;
      this.votedPlans.set(plan._id, newVote ? 1 : -1);
    }
  }

}
