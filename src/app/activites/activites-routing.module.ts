import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivitesPage } from './activites.page';

const routes: Routes = [
  {
    path: '',
    component: ActivitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivitesPageRoutingModule {}
