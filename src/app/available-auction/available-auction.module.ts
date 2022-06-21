import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvailableAuctionPageRoutingModule } from './available-auction-routing.module';

import { AvailableAuctionPage } from './available-auction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvailableAuctionPageRoutingModule
  ],
  declarations: [AvailableAuctionPage]
})
export class AvailableAuctionPageModule {}
