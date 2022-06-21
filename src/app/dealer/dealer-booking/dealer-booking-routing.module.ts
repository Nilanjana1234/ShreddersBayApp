import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealerBookingPage } from './dealer-booking.page';

const routes: Routes = [
  {
    path: '',
    component: DealerBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealerBookingPageRoutingModule {}
