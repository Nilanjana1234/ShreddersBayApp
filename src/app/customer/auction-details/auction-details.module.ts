import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuctionDetailsPageRoutingModule } from './auction-details-routing.module';

import { AuctionDetailsPage } from './auction-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuctionDetailsPageRoutingModule
  ],
  declarations: [AuctionDetailsPage]
})
export class AuctionDetailsPageModule {}
