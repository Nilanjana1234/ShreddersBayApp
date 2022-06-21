import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuctionAddrPageRoutingModule } from './auction-addr-routing.module';

import { AuctionAddrPage } from './auction-addr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuctionAddrPageRoutingModule
  ],
  declarations: [AuctionAddrPage]
})
export class AuctionAddrPageModule {}
