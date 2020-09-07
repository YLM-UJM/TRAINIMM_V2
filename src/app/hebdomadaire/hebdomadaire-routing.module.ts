import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HebdomadairePage } from './hebdomadaire.page';

const routes: Routes = [
  {
    path: '',
    component: HebdomadairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HebdomadairePageRoutingModule {}
