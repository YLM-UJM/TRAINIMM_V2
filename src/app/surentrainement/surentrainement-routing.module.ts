import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurentrainementPage } from './surentrainement.page';

const routes: Routes = [
  {
    path: '',
    component: SurentrainementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurentrainementPageRoutingModule {}
