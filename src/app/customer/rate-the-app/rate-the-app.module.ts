import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateTheAppPageRoutingModule } from './rate-the-app-routing.module';

import { RateTheAppPage } from './rate-the-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateTheAppPageRoutingModule
  ],
  declarations: [RateTheAppPage]
})
export class RateTheAppPageModule {}
