import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePageRoutingModule } from './update-routing.module';

import { UpdatePage } from './update.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalDayPage } from 'src/app/_modals/modal-day/modal-day.page';
import { ModalDayPageModule } from 'src/app/_modals/modal-day/modal-day.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePageRoutingModule,
    SharedModule,
    ModalDayPageModule,
  ],
  declarations: [UpdatePage]
})
export class UpdatePageModule {}
