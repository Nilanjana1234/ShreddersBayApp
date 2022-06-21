import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllAuctionPage } from './all-auction.page';

const routes: Routes = [
  {
    path: '',
    component: AllAuctionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllAuctionPageRoutingModule {}
