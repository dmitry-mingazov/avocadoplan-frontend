import { Component, OnInit, Input } from '@angular/core';
import { MealForm } from 'src/app/_models/meal-form';
import { CreatePage } from 'src/app/pages/create/create.page';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DishForm } from 'src/app/_models/dish-form';
import { ModalController } from '@ionic/angular';
import { EnumToArrayPipe  } from '../../_pipes/enum-to-array.pipe';
import { MealType } from 'src/app/_enums/meal-type.enum';

@Component({
  selector: 'app-modal-meal',
  templateUrl: './modal-meal.page.html',
  styleUrls: ['./modal-meal.page.scss'],
})
export class ModalMealPage implements OnInit {
  @Input() meal: FormGroup;
  @Input() modalCtrl: ModalController;

  private mealTypes = MealType;

  constructor(
    private fb: FormBuilder
  ) {
   }

  ngOnInit() {
  }

  addDish(control) {
    control.push(
      this.fb.group(new DishForm(null))
    )
  }

  deleteDish(control, index) {
    control.removeAt(index);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }


}
