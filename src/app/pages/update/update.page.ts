import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanService } from 'src/app/services/plan.service';
import { AuthService } from 'src/app/services/auth.service';
import { Plan } from 'src/app/_interfaces/plan.interface';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  _id: string;
  private plan: Plan;

  constructor(
    private route: ActivatedRoute,
    private planService: PlanService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('id');
    this.getPlan();
  }

  getPlan() {
    this.planService.getPlanById(this._id).subscribe( (data) => {
      this.plan = data;
      console.log(this.plan);
    })
  }

  updatePlan(event) {

    console.log(event);
    this.planService.updatePlan(event);
  }
}
