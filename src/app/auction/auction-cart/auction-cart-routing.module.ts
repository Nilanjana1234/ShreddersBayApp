import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuctionCartPage } from './auction-cart.page';

const routes: Routes = [
  {
    path: '',
    component: AuctionCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuctionCartPageRoutingModule {}
