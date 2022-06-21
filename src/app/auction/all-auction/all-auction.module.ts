import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllAuctionPageRoutingModule } from './all-auction-routing.module';

import { AllAuctionPage } from './all-auction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllAuctionPageRoutingModule
  ],
  declarations: [AllAuctionPage]
})
export class AllAuctionPageModule {}
