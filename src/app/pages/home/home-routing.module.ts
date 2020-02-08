import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { PlanPage } from '../plan/plan.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'plan/:id',
        component: PlanPage,
        children: [
          {
            path: '',
            loadChildren: () => import('../plan/plan.module').then(m => m.PlanPageModule),
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutPageRoutingModule { }
