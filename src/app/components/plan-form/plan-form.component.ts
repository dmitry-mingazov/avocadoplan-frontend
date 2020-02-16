import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { DayForm } from 'src/app/_models/day-form';
import { MealForm } from 'src/app/_models/meal-form';
import { MealType } from '../../_enums/meal-type.enum';
import { WeekDay } from '../../_enums/week-day.enum';
import { ModalController } from '@ionic/angular';
import { Plan } from 'src/app/_interfaces/plan.interface';
import { PlanForm } from 'src/app/_models/plan-form';
import { EnumToArrayPipe } from '../../_pipes/enum-to-array.pipe';
import { WEEK_DAY, MEAL_TYPE } from '../../shared/const-obj';
import { WeekForm } from 'src/app/_models/week-form';
import { ModalDayPage } from 'src/app/_modals/modal-day/modal-day.page';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss'],
})
export class PlanFormComponent implements OnInit {
  @Input() plan: Plan = null;

  @Output() submit: EventEmitter<Plan> = new EventEmitter<Plan>();

  private planForm: FormGroup;

  private mealTypes = MEAL_TYPE;
  private weekDays = WEEK_DAY;

  private weekDaysArray: Array<string> = new EnumToArrayPipe().transform(this.weekDays);


  private weeks = new Array<WeekForm>();
  private currentWeek = 0;

  private dayIndex = 0;

  private deletedDays = new Array<number>();

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) { 
  }

  ngOnInit() {
    this.planForm = this.fb.group(new PlanForm(this.plan));
    this.initWeeks();
    // console.log(this.plan);
    // this.addWeek();
  }
  
  addWeek() {
    this.weeks.push(new WeekForm(this.currentWeek));
    this.addDay(this.weeks[this.currentWeek++]);
  }

  removeWeek() {
    // this.currentWeek = this.weeks.pop();
  }

  addDay(week: WeekForm) {
    let control = <FormArray>this.planForm.controls.days;
    control.push(
      this.fb.group(new DayForm({weekDay: this.weekDaysArray[week.weekDayIndex % this.weekDaysArray.length], week: week.index, meals: null}))
    )
    week.addDay(control.at(this.dayIndex), this.dayIndex++);
  }
  
  deleteDay(week: WeekForm, index: number){
    // let control = <FormArray>this.planForm.controls.days;
    // control.removeAt(index);
    week.deleteDay(index);
    this.deletedDays.push(week.getAbsoluteIndex(index));
    console.log(week.isEmpty());
    if(week.isEmpty())
      this.deleteWeek(week.index);
  }

  deleteWeek(weekIndex: number) {
    let dayIndex = 0;
    let control = <FormArray>this.planForm.controls.days;
    this.planForm.controls.days.value.forEach( (day) => {
      console.log(day);
      let week = day.week;
      if(week > weekIndex){
        control.at(dayIndex).get('week').setValue(--week);
      }
      dayIndex++;
    })

    this.finalDelete();
    this.initWeeks();
  }

  finalDelete() {
    let control = <FormArray>this.planForm.controls.days;
    this.deletedDays.forEach( (index) => {
      control.removeAt(index);
      console.log("Removed i: ".concat(index.toString()));
    })
  }

  addMeal(control) {
    control.push(
      this.fb.group(new MealForm({type: "breakfast", dishes: null}))
    )
  }

  deleteMeal(control, mealIndex) {
    control.removeAt(mealIndex);
  }

  async openDayModal(day) {
    const modal = await this.modalCtrl.create({
      component: ModalDayPage,
      componentProps: {
        'day': day,
        'modalCtrl': this.modalCtrl
      }
    });
    return await modal.present();
  }

  submitForm() {
    this.finalDelete();
    this.planForm.controls.days.updateValueAndValidity();
    this.submit.emit(this.planForm.value);
    this.initWeeks();
  }

  initWeeks() {
    let control = <FormArray>this.planForm.controls.days;
    this.weeks = new Array<WeekForm>();
    this.dayIndex = 0;
    this.currentWeek = 0;
    this.deletedDays = new Array<number>();
    console.log(this.planForm.controls.days.value);
    this.planForm.controls.days.value.forEach( (day) => {
      while(this.weeks.length <= day.week)
        this.weeks.push(new WeekForm(this.currentWeek++));
      this.weeks[day.week].addDay(control.at(this.dayIndex), this.dayIndex++);

    })
      
  }
}
