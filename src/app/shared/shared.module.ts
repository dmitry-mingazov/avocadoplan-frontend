import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalMealPage } from '../_modals/modal-meal/modal-meal.page';
import { PlanFormComponent } from '../components/plan-form/plan-form.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { EnumToArrayPipe } from '../_pipes/enum-to-array.pipe';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [
    ModalMealPage,
    PlanFormComponent,
    EnumToArrayPipe
  ],
  exports: [
    ModalMealPage,
    PlanFormComponent,
    EnumToArrayPipe
  ]
})
export class SharedModule { }
