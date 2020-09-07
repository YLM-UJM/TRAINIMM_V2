import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurentrainementPageRoutingModule } from './surentrainement-routing.module';

import { SurentrainementPage } from './surentrainement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurentrainementPageRoutingModule
  ],
  declarations: [SurentrainementPage]
})
export class SurentrainementPageModule {}
