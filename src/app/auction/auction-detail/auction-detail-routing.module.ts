import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuctionDetailPage } from './auction-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AuctionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuctionDetailPageRoutingModule {}
