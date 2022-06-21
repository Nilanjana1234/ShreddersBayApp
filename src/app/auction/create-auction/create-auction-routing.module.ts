import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAuctionPage } from './create-auction.page';

const routes: Routes = [
  {
    path: '',
    component: CreateAuctionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateAuctionPageRoutingModule {}
