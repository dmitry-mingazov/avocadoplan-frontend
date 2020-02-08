import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlanService } from 'src/app/services/plan.service';
import { Plan } from 'src/app/_interfaces/plan.interface';

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
    private navCtrl: NavController,
    private planService: PlanService
  ) { }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('id');
    this.loadPlan();
    this.getPlan();
  }

  close() {
    this.navCtrl.pop();
  }

  loadPlan() {
    this.plan = this.planService.loadPlanById(this._id);
  }

  getPlan() {
    this.planService.getPlanById(this._id).subscribe( (data) => {
      this.plan = data;
    })
  }
}
