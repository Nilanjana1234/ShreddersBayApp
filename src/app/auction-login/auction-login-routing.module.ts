import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuctionLoginPage } from './auction-login.page';

const routes: Routes = [
  {
    path: '',
    component: AuctionLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuctionLoginPageRoutingModule {}
