import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
          }

        ]
      },
      // {
      //   path: 'create',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () => import('../create/create.module').then(m => m.CreatePageModule),
      //     }
      //   ]
      // },
      {
        path: 'user',
        children: [
          {
            path: '',
            loadChildren: () => import('../user/user.module').then(m => m.UserPageModule),
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/home',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
