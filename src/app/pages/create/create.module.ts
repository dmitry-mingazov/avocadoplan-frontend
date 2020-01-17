import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePageRoutingModule } from './create-routing.module';

import { CreatePage } from './create.page';
import { DayFormComponent } from 'src/app/_forms/day-form/day-form.component';
import { MealFormComponent } from 'src/app/_forms/meal-form/meal-form.component';
import { DishFormComponent } from 'src/app/_forms/dish-form/dish-form.component';
import { PipesModule } from 'src/app/_pipes/pipes/pipes.module';
import { EnumToArrayPipe } from 'src/app/_pipes/enum-to-array.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePageRoutingModule,
    ReactiveFormsModule,

  ],
  declarations: [CreatePage,
    DayFormComponent,
    MealFormComponent,
    DishFormComponent,
    EnumToArrayPipe
    ]
})
export class CreatePageModule {}
