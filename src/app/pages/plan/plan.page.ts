import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlanService } from 'src/app/services/plan.service';
import { Plan } from 'src/app/_interfaces/plan.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {
  _id: string;
  private plan: Plan;

  constructor(
    private route: ActivatedRoute,
    private planService: PlanService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('id');
    this.loadPlan();
    this.getPlan();
  }

  loadPlan() {
    this.plan = this.planService.loadPlanById(this._id);
  }

  getPlan() {
    this.planService.getPlanById(this._id).subscribe( (data) => {
      this.plan = data;
    })
  }

  deletePlan() {
    this.planService.deletePlanById(this._id);
  }
}
