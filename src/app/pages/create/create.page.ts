import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/services/plan.service';
import { AuthService } from 'src/app/services/auth.service';
import { Plan } from 'src/app/_interfaces/plan.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {


  constructor(
    private planService: PlanService,
    private auth: AuthService,
    ) {}

  ngOnInit() {}

  createPlan(plan: Plan){
    plan.owner = this.auth.user.sub;
    this.planService.createPlan(plan);

  }

  submitPlan(event) {
    this.createPlan(event);

  }

}
