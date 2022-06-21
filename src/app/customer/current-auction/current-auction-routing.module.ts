import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentAuctionPage } from './current-auction.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentAuctionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentAuctionPageRoutingModule {}
