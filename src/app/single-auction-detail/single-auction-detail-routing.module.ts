import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleAuctionDetailPage } from './single-auction-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SingleAuctionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleAuctionDetailPageRoutingModule {}
