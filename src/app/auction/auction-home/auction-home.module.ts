import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuctionHomePageRoutingModule } from './auction-home-routing.module';

import { AuctionHomePage } from './auction-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuctionHomePageRoutingModule
  ],
  declarations: [AuctionHomePage]
})
export class AuctionHomePageModule {}
