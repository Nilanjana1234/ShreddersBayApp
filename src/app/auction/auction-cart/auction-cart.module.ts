import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuctionCartPageRoutingModule } from './auction-cart-routing.module';

import { AuctionCartPage } from './auction-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuctionCartPageRoutingModule
  ],
  declarations: [AuctionCartPage]
})
export class AuctionCartPageModule {}
