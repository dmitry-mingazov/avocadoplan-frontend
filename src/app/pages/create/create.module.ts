import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePageRoutingModule } from './create-routing.module';

import { CreatePage } from './create.page';
import { PipesModule } from 'src/app/_pipes/pipes/pipes.module';
import { EnumToArrayPipe } from 'src/app/_pipes/enum-to-array.pipe';
import { PlanFormComponent } from 'src/app/components/plan-form/plan-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalDayPage } from 'src/app/_modals/modal-day/modal-day.page';
import { ModalDayPageModule } from 'src/app/_modals/modal-day/modal-day.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePageRoutingModule,
    ReactiveFormsModule,
    ModalDayPageModule,
    SharedModule
  ],
  declarations: [
    CreatePage
    ],
})
export class CreatePageModule {}
