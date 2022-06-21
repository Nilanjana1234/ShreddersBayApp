import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAuctionPage } from './my-auction.page';

const routes: Routes = [
  {
    path: '',
    component: MyAuctionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAuctionPageRoutingModule {}
