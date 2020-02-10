import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { DayForm } from 'src/app/_models/day-form';
import { MealForm } from 'src/app/_models/meal-form';
import { MealType } from '../../_enums/meal-type.enum';
import { ModalController } from '@ionic/angular';
import { ModalMealPage } from '../../_modals/modal-meal/modal-meal.page';
import { Plan } from 'src/app/_interfaces/plan.interface';
import { PlanForm } from 'src/app/_models/plan-form';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss'],
})
export class PlanFormComponent implements OnInit {
  @Input() plan: Plan = null;

  @Output() submit: EventEmitter<Plan> = new EventEmitter<Plan>();

  private planForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) { 
    this.planForm = this.fb.group(new PlanForm(this.plan));
  }

  ngOnInit() {}

  addDay() {
    let control = <FormArray>this.planForm.controls.days;
    control.push(
      this.fb.group(new DayForm(null))
    )
  }
  
  deleteDay(index){
    let control = <FormArray>this.planForm.controls.days;
    control.removeAt(index);
  }

  addMeal(control) {
    control.push(
      this.fb.group(new MealForm({type: MealType.breakfast, dishes: null}))
    )
  }

  deleteMeal(control, mealIndex) {
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

  submitForm() {
    this.submit.emit(this.planForm.value);
  }

}
