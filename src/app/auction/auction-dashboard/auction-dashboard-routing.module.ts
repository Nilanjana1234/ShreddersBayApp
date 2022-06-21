import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuctionDashboardPage } from './auction-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: AuctionDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuctionDashboardPageRoutingModule {}
