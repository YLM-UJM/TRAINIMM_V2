import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SommeilPageRoutingModule } from './sommeil-routing.module';

import { SommeilPage } from './sommeil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SommeilPageRoutingModule
  ],
  declarations: [SommeilPage]
})
export class SommeilPageModule {}
