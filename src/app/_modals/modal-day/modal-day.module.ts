import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalDayPageRoutingModule } from './modal-day-routing.module';

import { ModalDayPage } from './modal-day.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDayPageRoutingModule,
    ReactiveFormsModule
  ]
})
export class ModalDayPageModule {}
