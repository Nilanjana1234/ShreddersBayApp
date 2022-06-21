import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobilePageRoutingModule } from './mobile-routing.module';

import { MobilePage } from './mobile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MobilePage]
})
export class MobilePageModule {}
