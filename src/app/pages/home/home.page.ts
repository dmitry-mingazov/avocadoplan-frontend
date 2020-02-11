import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PlanService } from 'src/app/services/plan.service';
import { Plan } from 'src/app/_interfaces/plan.interface';
import { PlanPageModule } from '../plan/plan.module';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/_interfaces/user.interface';

const UPVOTE = true;
const DOWNVOTE = false;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private plans: Plan[] = null;
  private loading: boolean = true;

  private user: User;
  private votedPlans: Map<string, number> = new Map();
  private userFetched: boolean = false;

  private plansMapped: boolean = false;

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
          this.user = user;
          this.userFetched = true;
          Object.keys(user.votes).forEach( (_id) => {
            this.votedPlans.set(_id, user.votes[_id]);
          })
          if(this.plans != null) {
            this.plans.map<Plan>(this.mapPlan);
            this.plansMapped = true;
          }
        })
        } else {
          this.plansMapped = true;
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

  openPlan(plan) {
    this.navCtrl.navigateForward(`plan/${plan._id}`);
  }

  upvotePlan(plan) {
    this.planService.upvotePlan(plan._id);
    this.modifyLocalVotes(plan, UPVOTE);
  }
  
  downvotePlan(plan) {
    this.planService.downvotePlan(plan._id);
    this.modifyLocalVotes(plan, DOWNVOTE);
  }

  modifyLocalVotes(plan, newVote) {
    
    if(plan.upvoted == plan.downvoted)
      plan.votes += newVote ? 1 : -1;
    else
      plan.votes += newVote ? 2 : -2;
    plan.upvoted = newVote;
    plan.downvoted = !newVote;
    this.votedPlans.set(plan._id, newVote ? 1 : -1);
  }

}
