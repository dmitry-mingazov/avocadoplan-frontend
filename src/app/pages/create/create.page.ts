import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { PlanService } from 'src/app/services/plan.service';
import { Subscription } from 'rxjs';
import { PlanForm } from 'src/app/_models/plan-form';
import { DayForm } from 'src/app/_models/day-form';
import { MealForm } from 'src/app/_models/meal-form';
import { MealType } from 'src/app/_enums/meal-type.enum';
import { DishForm } from 'src/app/_models/dish-form';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  // private createForm : FormGroup;
  private planForm: FormGroup;
  private planFormSub: Subscription;
  private mealTypes = MealType;
  private overlayHidden: Array<Array<boolean>>;

  constructor(
    private alertController: AlertController,
    private fb: FormBuilder,
    private planService: PlanService,
    private auth: AuthService
    ) {
      this.planForm = this.fb.group(new PlanForm());
      this.overlayHidden = new Array(); 
  }

  ngOnInit() {}

  async confirm() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Do you want to confirm?',
      buttons: ['cancel', 'OK']
    });
    await alert.present();
    this.createPlan();
  }

  createPlan(){
    this.planForm.controls.owner.setValue(this.auth.user.sub);
    this.planService.createPlan(this.planForm.value);
  }

  addDay(){
    let control = <FormArray>this.planForm.controls.days;
    control.push(
      this.fb.group(new DayForm(null))
    )
    this.overlayHidden.push(new Array());
  }

  deleteDay(index){
    let control = <FormArray>this.planForm.controls.days;
    control.removeAt(index);
    this.overlayHidden.splice(index, 1);
  }

  addMeal(control, index) {
    control.push(
      this.fb.group(new MealForm({type: MealType.breakfast, dishes: null}))
    )
    this.overlayHidden[index].push(true);
  }

  deleteMeal(control, dayIndex, mealIndex) {
    control.removeAt(mealIndex);
    this.overlayHidden[dayIndex].splice(mealIndex, 1);
  }

  addDish(control) {
    control.push(
      this.fb.group(new DishForm(null))
    )
  }

  deleteDish(control, index) {
    control.removeAt(index);
  }
  
  showMealOverlay(dayIndex, mealIndex){
    this.overlayHidden[dayIndex][mealIndex] = false;

  }

  hideMealOverlay(dayIndex, mealIndex) {
    this.overlayHidden[dayIndex][mealIndex] = true;
  }

}
