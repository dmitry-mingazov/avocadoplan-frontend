import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalMealPageRoutingModule } from './modal-meal-routing.module';

import { ModalMealPage } from './modal-meal.page';
import { EnumToArrayPipe } from 'src/app/_pipes/enum-to-array.pipe';
import { CreatePageModule } from 'src/app/pages/create/create.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMealPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ModalMealPage,
    EnumToArrayPipe
    ]
})
export class ModalMealPageModule {}
