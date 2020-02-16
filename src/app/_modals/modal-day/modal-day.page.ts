import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { WEEK_DAY, MEAL_TYPE} from '../../shared/const-obj';
import { MealForm } from 'src/app/_models/meal-form';
import { DishForm } from 'src/app/_models/dish-form';
import { EnumToArrayPipe } from '../../_pipes/enum-to-array.pipe';

@Component({
  selector: 'app-modal-day',
  templateUrl: './modal-day.page.html',
  styleUrls: ['./modal-day.page.scss'],
})
export class ModalDayPage implements OnInit {
  @Input() day: FormGroup;
  @Input() modalCtrl: ModalController;

  private weekDays = WEEK_DAY;
  private mealTypes = MEAL_TYPE;

  private mealTypesArray = new EnumToArrayPipe().transform(this.mealTypes);
  private mealTypeIndex = 0;

  constructor(
    private fb: FormBuilder
  ) { }


  ngOnInit() {
  }

  addMeal(control) {
    control.push(
      this.fb.group(new MealForm({type: this.mealTypesArray[this.mealTypeIndex++], dishes: null}))
    );
  }

  deleteMeal(control, index) {
    control.removeAt(index);
    this.mealTypeIndex--;
  }

  addDish(control) {
    control.push(
      this.fb.group(new DishForm(null))
    );
  }

  deleteDish(control, index) {
    control.removeAt(index);
  }
  
  closeModal() {
    this.modalCtrl.dismiss();
  }

}
