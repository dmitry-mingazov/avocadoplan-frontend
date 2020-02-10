import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePageRoutingModule } from './update-routing.module';

import { UpdatePage } from './update.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalMealPage } from 'src/app/_modals/modal-meal/modal-meal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePageRoutingModule,
    SharedModule
  ],
  declarations: [UpdatePage],
  entryComponents: [ ModalMealPage]
})
export class UpdatePageModule {}
