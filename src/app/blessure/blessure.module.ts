import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlessurePageRoutingModule } from './blessure-routing.module';

import { BlessurePage } from './blessure.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlessurePageRoutingModule
  ],
  declarations: [BlessurePage]
})
export class BlessurePageModule {}
