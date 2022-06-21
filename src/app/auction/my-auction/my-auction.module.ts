import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAuctionPageRoutingModule } from './my-auction-routing.module';

import { MyAuctionPage } from './my-auction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAuctionPageRoutingModule
  ],
  declarations: [MyAuctionPage]
})
export class MyAuctionPageModule {}
