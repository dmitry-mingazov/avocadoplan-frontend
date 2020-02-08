import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PlanService } from 'src/app/services/plan.service';
import { Plan } from 'src/app/_interfaces/plan.interface';
import { PlanPageModule } from '../plan/plan.module';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private plans: Plan[] = null;
  private loading: boolean = true;

  constructor(
    private planService: PlanService,
    private navCtrl: NavController 
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

  doRefresh(event) {
    this.planService.getHome().subscribe((data) => {
      this.plans = data;
      event.target.complete();
    })
  }

  openPlan(plan) {
    this.navCtrl.navigateForward(`plan/${plan._id}`);
  }

}
