import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuctionDashboardPageRoutingModule } from './auction-dashboard-routing.module';

import { AuctionDashboardPage } from './auction-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuctionDashboardPageRoutingModule
  ],
  declarations: [AuctionDashboardPage]
})
export class AuctionDashboardPageModule {}
