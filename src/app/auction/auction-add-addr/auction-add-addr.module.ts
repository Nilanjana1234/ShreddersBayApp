import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule, } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuctionAddAddrPageRoutingModule } from './auction-add-addr-routing.module';

import { AuctionAddAddrPage } from './auction-add-addr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuctionAddAddrPageRoutingModule
  ],
  declarations: [AuctionAddAddrPage]
})
export class AuctionAddAddrPageModule {}
