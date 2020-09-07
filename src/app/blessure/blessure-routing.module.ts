import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlessurePage } from './blessure.page';

const routes: Routes = [
  {
    path: '',
    component: BlessurePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlessurePageRoutingModule {}
