import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuctionDetailsPage } from './auction-details.page';

const routes: Routes = [
  {
    path: '',
    component: AuctionDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuctionDetailsPageRoutingModule {}
