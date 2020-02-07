import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PlanService } from 'src/app/services/plan.service';
import { Plan } from 'src/app/_interfaces/plan.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private plans: Plan[] = null;
  private loading: boolean = true;

  constructor(
    private planService: PlanService
  ) {}

  ngOnInit() {
    this.getHome();
  }

  getHome() {
    this.planService.getHome().subscribe( (data) => {
      this.plans = data;
      this.loading = false;
    })
  }

}
