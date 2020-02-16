import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDayPage } from './modal-day.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDayPageRoutingModule {}
