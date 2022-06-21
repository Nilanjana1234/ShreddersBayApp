import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DealerHomePageRoutingModule } from './dealer-home-routing.module';

import { DealerHomePage } from './dealer-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DealerHomePageRoutingModule
  ],
  declarations: [DealerHomePage]
})
export class DealerHomePageModule {}
