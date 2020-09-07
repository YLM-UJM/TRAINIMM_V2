import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HebdomadairePageRoutingModule } from './hebdomadaire-routing.module';

import { HebdomadairePage } from './hebdomadaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HebdomadairePageRoutingModule
  ],
  declarations: [HebdomadairePage]
})
export class HebdomadairePageModule {}
