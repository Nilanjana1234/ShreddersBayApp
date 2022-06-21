import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAuctionPageRoutingModule } from './create-auction-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAuctionPage } from './create-auction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateAuctionPageRoutingModule
  ],
  declarations: [CreateAuctionPage]
})
export class CreateAuctionPageModule {}
