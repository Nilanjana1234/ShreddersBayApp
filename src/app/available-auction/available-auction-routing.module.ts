import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvailableAuctionPage } from './available-auction.page';

const routes: Routes = [
  {
    path: '',
    component: AvailableAuctionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvailableAuctionPageRoutingModule {}
