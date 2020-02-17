import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { PlanService } from "src/app/services/plan.service";
import { Plan } from "src/app/_interfaces/plan.interface";
import { AuthService } from "src/app/services/auth.service";
import { WEEK_DAY, MEAL_TYPE } from '../../shared/const-obj';

@Component({
  selector: "app-plan",
  templateUrl: "./plan.page.html",
  styleUrls: ["./plan.page.scss"]
})
export class PlanPage implements OnInit {
  _id: string;
  private plan: Plan;

  private weekDays = WEEK_DAY;
  private mealTypes = MEAL_TYPE;

  constructor(
    private route: ActivatedRoute,
    private planService: PlanService,
    private auth: AuthService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get("id");
    this.loadPlan();
    this.getPlan();
  }

  loadPlan() {
    this.plan = this.planService.loadPlanById(this._id);
  }

  getPlan() {
    this.planService.getPlanById(this._id).subscribe(data => {
      this.plan = data;
    });
  }

  deletePlan() {
    this.planService.deletePlanById(this._id);
  }

  updatePlan() {
    this.navCtrl.navigateForward(`update/${this._id}`);
  }

  savePlan() {
    this.planService.savePlan(this._id);
  }
}
