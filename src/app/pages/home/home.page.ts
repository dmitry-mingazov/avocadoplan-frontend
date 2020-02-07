import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PlanService } from 'src/app/services/plan.service';
import { Plan } from 'src/app/_interfaces/plan.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private plans: Plan[] = null;

  constructor(
    private planService: PlanService
  ) {}

  getHome() {
    this.planService.getHome().subscribe( (data) => {
      this.plans = data;
    })
  }

}
