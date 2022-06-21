import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleOrderDetailPage } from './single-order-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SingleOrderDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleOrderDetailPageRoutingModule {}
