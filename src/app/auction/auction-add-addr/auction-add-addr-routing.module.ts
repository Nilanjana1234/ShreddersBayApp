import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuctionAddAddrPage } from './auction-add-addr.page';

const routes: Routes = [
  {
    path: '',
    component: AuctionAddAddrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuctionAddAddrPageRoutingModule {}
