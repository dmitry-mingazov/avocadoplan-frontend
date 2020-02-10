import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalMealPageRoutingModule } from './modal-meal-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMealPageRoutingModule,
    ReactiveFormsModule
  ]
})
export class ModalMealPageModule {}
