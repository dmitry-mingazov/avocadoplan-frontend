import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePageRoutingModule } from './create-routing.module';

import { CreatePage } from './create.page';
import { PipesModule } from 'src/app/_pipes/pipes/pipes.module';
import { EnumToArrayPipe } from 'src/app/_pipes/enum-to-array.pipe';
import { ModalMealPage } from 'src/app/_modals/modal-meal/modal-meal.page';
import { ModalMealPageModule } from 'src/app/_modals/modal-meal/modal-meal.module';
import { PlanFormComponent } from 'src/app/components/plan-form/plan-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePageRoutingModule,
    ReactiveFormsModule,
    ModalMealPageModule,
  ],
  declarations: [
    CreatePage,
    PlanFormComponent
    ],
  entryComponents: [ 
    ModalMealPage,
    PlanFormComponent 
  ]
})
export class CreatePageModule {}
