import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { PlanService } from 'src/app/services/plan.service';
import { Subscription } from 'rxjs';
import { PlanForm } from 'src/app/_models/plan-form';
import { DayForm } from 'src/app/_models/day-form';
import { MealForm } from 'src/app/_models/meal-form';
import { DishForm } from 'src/app/_models/dish-form';
import { AuthService } from 'src/app/services/auth.service';
import { ModalMealPage } from 'src/app/_modals/modal-meal/modal-meal.page';
import { MealType } from '../../_enums/meal-type.enum';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  // private createForm : FormGroup;
  private planForm: FormGroup;
  private planFormSub: Subscription;

  constructor(
    // private alertController: AlertController,
    private fb: FormBuilder,
    private planService: PlanService,
    private auth: AuthService,
    private navCtrl: NavController,
    private modalCtrl: ModalController
    ) {
      this.planForm = this.fb.group(new PlanForm());
  }

  ngOnInit() {}

  async confirm() {
    // const alert = await this.alertController.create({
    //   header: 'Confirm',
    //   message: 'Do you want to confirm?',
    //   buttons: ['cancel', 'OK']
    // });
    // await alert.present();
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
  }

  deleteDay(index){
    let control = <FormArray>this.planForm.controls.days;
    control.removeAt(index);
  }

  addMeal(control, index) {
    control.push(
      this.fb.group(new MealForm({type: MealType.breakfast, dishes: null}))
    )
  }

  deleteMeal(control, dayIndex, mealIndex) {
    control.removeAt(mealIndex);
  }


  async presentModal(meal) {
    const modal = await this.modalCtrl.create({
      component: ModalMealPage,
      componentProps: {
        'meal': meal,
        'modalCtrl': this.modalCtrl,
      },
      cssClass: 'meal-modal'
    });
    return await modal.present();
  }

  close() {
    this.navCtrl.pop();
  }

}
