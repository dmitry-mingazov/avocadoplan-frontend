import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalMealPage } from './modal-meal.page';

const routes: Routes = [
  {
    path: '',
    component: ModalMealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalMealPageRoutingModule {}
