import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleAuctionDetailPageRoutingModule } from './single-auction-detail-routing.module';

import { SingleAuctionDetailPage } from './single-auction-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleAuctionDetailPageRoutingModule
  ],
  declarations: [SingleAuctionDetailPage]
})
export class SingleAuctionDetailPageModule {}
