import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentAuctionPageRoutingModule } from './current-auction-routing.module';

import { CurrentAuctionPage } from './current-auction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentAuctionPageRoutingModule
  ],
  declarations: [CurrentAuctionPage]
})
export class CurrentAuctionPageModule {}
